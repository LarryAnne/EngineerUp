import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import {
  getDailyQuote,
  getQuoteFeed,
  getStoryFeed,
  getTaskFeed,
  getTodayStory,
  getTodayTask,
} from "@/services/content";

export function useQuoteFeed(limit = 30) {
  const { user, profile } = useAuth();
  const userId = user?.id ?? null;
  const country = profile?.country ?? null;
  return useQuery({
    queryKey: ["quote-feed", userId, country, limit],
    queryFn: () => getQuoteFeed({ userId, country, limit }),
    staleTime: 60_000,
  });
}

export function useDailyQuote() {
  const { user, profile } = useAuth();
  const userId = user?.id ?? null;
  const country = profile?.country ?? null;
  return useQuery({
    queryKey: ["daily-quote", userId, country],
    queryFn: () => getDailyQuote({ userId, country }),
    staleTime: 60 * 60_000,
  });
}

export function useStoryFeed(limit = 12) {
  const { user, profile } = useAuth();
  const userId = user?.id ?? null;
  const country = profile?.country ?? null;
  return useQuery({
    queryKey: ["story-feed", userId, country, limit],
    queryFn: () => getStoryFeed({ userId, country, limit }),
    staleTime: 60_000,
  });
}

export function useTodayStory() {
  const { user, profile } = useAuth();
  const userId = user?.id ?? null;
  const country = profile?.country ?? null;
  return useQuery({
    queryKey: ["today-story", userId, country],
    queryFn: () => getTodayStory({ userId, country }),
    staleTime: 60 * 60_000,
  });
}

export function useTaskFeed(limit = 12) {
  const { user, profile } = useAuth();
  const userId = user?.id ?? null;
  const country = profile?.country ?? null;
  return useQuery({
    queryKey: ["task-feed", userId, country, limit],
    queryFn: () => getTaskFeed({ userId, country, limit }),
    staleTime: 60_000,
  });
}

export function useTodayTask() {
  const { user, profile } = useAuth();
  const userId = user?.id ?? null;
  const country = profile?.country ?? null;
  return useQuery({
    queryKey: ["today-task", userId, country],
    queryFn: () => getTodayTask({ userId, country }),
    staleTime: 60 * 60_000,
  });
}
