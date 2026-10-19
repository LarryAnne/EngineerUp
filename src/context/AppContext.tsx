import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { cachedRead } from '@/lib/content-cache';

interface AppContextType {
  favorites: number[];
  toggleFavorite: (quoteId: number) => void;
  isFavorite: (quoteId: number) => boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  completedTasks: number[];
  markTaskComplete: (taskId: number, proofUrl?: string) => Promise<void>;
  streak: number;
  lastVisit: string | null;
  updateStreak: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [lastVisit, setLastVisit] = useState<string | null>(null);

  // Theme + initial guest data
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    const savedTasks = localStorage.getItem('completedTasks');
    if (savedTasks) setCompletedTasks(JSON.parse(savedTasks));
    const savedStreak = localStorage.getItem('streak');
    if (savedStreak) setStreak(parseInt(savedStreak, 10));
    const savedLastVisit = localStorage.getItem('lastVisit');
    if (savedLastVisit) setLastVisit(savedLastVisit);
    updateStreakLocal();
  }, []);

  // When user logs in, sync from Supabase + migrate guest favorites
  useEffect(() => {
    if (!user) return;
    (async () => {
      // Migrate any guest favorites
      const guestFavs: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (guestFavs.some(id => id > 0)) {
        const migrated = await cachedRead(`guest-migration:${user.id}`, async signal => {
          const { error } = await supabase.from('favorites').upsert(
            guestFavs.filter(id => id > 0).map((quote_id) => ({ user_id: user.id, quote_id })),
            { onConflict: 'user_id,quote_id', ignoreDuplicates: true }
          ).abortSignal(signal);
          if (error) throw error;
          return true;
        }, false);
        if (migrated) localStorage.removeItem('favorites');
      }
      const snapshot = await cachedRead<{ favorites: number[]; tasks: number[]; streak: number; lastVisit: string | null }>(`account:${user.id}`, async signal => {
        const [favs, tasks, progress] = await Promise.all([
          supabase.from('favorites').select('quote_id').eq('user_id', user.id).abortSignal(signal),
          supabase.from('task_submissions').select('task_id').eq('user_id', user.id).eq('completed', true).abortSignal(signal),
          supabase.from('streaks').select('*').eq('user_id', user.id).abortSignal(signal).maybeSingle(),
        ]);
        if (favs.error || tasks.error || progress.error) throw favs.error ?? tasks.error ?? progress.error;
        return { favorites: (favs.data ?? []).map(f => f.quote_id), tasks: (tasks.data ?? []).map(t => t.task_id),
          streak: progress.data?.current_streak ?? 0, lastVisit: progress.data?.last_visit ?? null };
      }, { favorites: [], tasks: [], streak: 0, lastVisit: null });
      setFavorites(snapshot.favorites);
      setCompletedTasks(snapshot.tasks);
      setStreak(snapshot.streak);
      setLastVisit(snapshot.lastVisit);
      updateStreakRemote();
    })();
  }, [user]);

  const updateStreakLocal = () => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('lastVisit');
    let newStreak = 1;
    if (saved) {
      const lastVisitDate = new Date(saved);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastVisitDate.toDateString() === yesterday.toDateString()) {
        newStreak = (parseInt(localStorage.getItem('streak') || '0', 10)) + 1;
      } else if (lastVisitDate.toDateString() === today) {
        newStreak = parseInt(localStorage.getItem('streak') || '1', 10);
      }
    }
    setStreak(newStreak);
    localStorage.setItem('streak', newStreak.toString());
    setLastVisit(today);
    localStorage.setItem('lastVisit', today);
  };

  const updateStreakRemote = async () => {
    if (!user) return;
    const today = new Date().toISOString().slice(0, 10);
    const { data } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    let next = 1;
    if (data) {
      const last = (data as any).last_visit;
      if (last) {
        const lastDate = new Date(last);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastDate.toDateString() === yesterday.toDateString()) {
          next = ((data as any).current_streak || 0) + 1;
        } else if (lastDate.toDateString() === new Date().toDateString()) {
          next = (data as any).current_streak || 1;
        }
      }
    }
    await supabase.from('streaks').upsert(
      { user_id: user.id, current_streak: next, last_visit: today },
      { onConflict: 'user_id' }
    );
    setStreak(next);
    setLastVisit(today);
  };

  const updateStreak = () => {
    if (user) updateStreakRemote();
    else updateStreakLocal();
  };

  const toggleFavorite = async (quoteId: number) => {
    if (user && quoteId > 0) {
      if (favorites.includes(quoteId)) {
        await supabase.from('favorites').delete().eq('user_id', user.id).eq('quote_id', quoteId);
        setFavorites((p) => p.filter((id) => id !== quoteId));
      } else {
        await supabase.from('favorites').insert({ user_id: user.id, quote_id: quoteId });
        setFavorites((p) => [...p, quoteId]);
      }
    } else {
      setFavorites((prev) => {
        const next = prev.includes(quoteId) ? prev.filter((id) => id !== quoteId) : [...prev, quoteId];
        localStorage.setItem('favorites', JSON.stringify(next));
        return next;
      });
    }
  };

  const isFavorite = (quoteId: number) => favorites.includes(quoteId);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  };

  const markTaskComplete = async (taskId: number, proofUrl?: string) => {
    if (user) {
      if (taskId < 0) throw new Error('This backup task can be read, but cannot be submitted. Try a live task when the service returns.');
      const { error } = await supabase.from('task_submissions').insert({
        user_id: user.id,
        task_id: taskId,
        completed: true,
        proof_url: proofUrl ?? null,
      });
      if (error) throw error;
    }
    setCompletedTasks((prev) => {
      const next = prev.includes(taskId) ? prev : [...prev, taskId];
      if (!user) localStorage.setItem('completedTasks', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        theme,
        toggleTheme,
        completedTasks,
        markTaskComplete,
        streak,
        lastVisit,
        updateStreak,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
}
