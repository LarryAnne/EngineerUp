import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Quote } from '../data/quotes';

interface AppContextType {
  favorites: number[];
  toggleFavorite: (quoteId: number) => void;
  isFavorite: (quoteId: number) => boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  completedTasks: number[];
  markTaskComplete: (taskId: number) => void;
  streak: number;
  lastVisit: string | null;
  updateStreak: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [lastVisit, setLastVisit] = useState<string | null>(null);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    const savedTasks = localStorage.getItem('completedTasks');
    if (savedTasks) {
      setCompletedTasks(JSON.parse(savedTasks));
    }

    const savedStreak = localStorage.getItem('streak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }

    const savedLastVisit = localStorage.getItem('lastVisit');
    if (savedLastVisit) {
      setLastVisit(savedLastVisit);
    }

    updateStreak();
  }, []);

  const updateStreak = () => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('lastVisit');

    if (saved) {
      const lastVisitDate = new Date(saved);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastVisitDate.toDateString() === yesterday.toDateString()) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem('streak', newStreak.toString());
      } else if (lastVisitDate.toDateString() !== today) {
        setStreak(1);
        localStorage.setItem('streak', '1');
      }
    } else {
      setStreak(1);
      localStorage.setItem('streak', '1');
    }

    setLastVisit(today);
    localStorage.setItem('lastVisit', today);
  };

  const toggleFavorite = (quoteId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(quoteId)
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (quoteId: number) => favorites.includes(quoteId);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  };

  const markTaskComplete = (taskId: number) => {
    setCompletedTasks(prev => {
      const newTasks = prev.includes(taskId) ? prev : [...prev, taskId];
      localStorage.setItem('completedTasks', JSON.stringify(newTasks));
      return newTasks;
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
        updateStreak
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
