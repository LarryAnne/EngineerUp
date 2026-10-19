import { supabase } from "@/integrations/supabase/client";
import { cachedRead, readLocal, writeLocal, localViewed, rememberViewed } from "@/lib/content-cache";
import { backupQuotes, backupStories, backupTasks } from "./backup-content";

// Domain types served to the UI.
export interface GQuote {
  id: number;
  text: string;
  author: string;
  category: string[];
  country: string | null;
  tone: string | null;
  image: string;
}

export interface GStory {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  category: string;
  country: string | null;
  tone: string | null;
  read_minutes: number;
  image: string;
  date: string;
}

export interface GTask {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  minutes: number;
  country: string | null;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1200&q=80";

/* ----- AI top-up trigger (best-effort, never blocks the UI) ----- */
const REFILL_THRESHOLD = 10;
const REFILL_COUNT = 8;
const refillingInFlight: Record<string, boolean> = {};

async function triggerRefill(
  type: "quote" | "story" | "task",
  country: string | null,
) {
  const key = `${type}:${country ?? "any"}`;
  if (refillingInFlight[key]) return;
  refillingInFlight[key] = true;
  try {
    await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, count: REFILL_COUNT, country }),
    });
  } catch {
    /* swallow — fallback pool is still served */
  } finally {
    setTimeout(() => {
      delete refillingInFlight[key];
    }, 30_000);
  }
}

/* =========================================================================
 * QUOTES
 * ========================================================================= */
export async function getQuoteFeed(opts: {
  userId: string | null;
  country: string | null;
  limit?: number;
}): Promise<GQuote[]> {
  const limit = opts.limit ?? 30;
  const pool = await cachedRead<GQuote[]>("quotes", async (signal) => {
    const { data, error } = await supabase.from("generated_quotes").select("*").order("id", { ascending: false }).limit(300).abortSignal(signal);
    if (error || !data?.length) throw error ?? new Error("Empty pool");
    return data.map(mapQuote);
  }, backupQuotes);
  const viewedIds = await viewedHistory("quote", opts.userId);
  const rows = selectContent(pool, viewedIds, opts.country, limit);
  if (rows.length < REFILL_THRESHOLD) void triggerRefill("quote", opts.country);
  return rows;
}

export async function markQuoteViewed(userId: string, quoteId: number) {
  rememberViewed("quote", userId, quoteId);
  if (quoteId < 0) return;
  await cachedRead(`view-write:quote:${userId}:${quoteId}`, async (signal) => {
    const { error } = await supabase.from("viewed_quotes")
      .upsert({ user_id: userId, quote_id: quoteId }, { onConflict: "user_id,quote_id" }).abortSignal(signal);
    if (error) throw error;
    return true;
  }, false);
}

/* =========================================================================
 * STORIES
 * ========================================================================= */
export async function getStoryFeed(opts: {
  userId: string | null;
  country: string | null;
  limit?: number;
}): Promise<GStory[]> {
  const limit = opts.limit ?? 12;
  const pool = await cachedRead<GStory[]>("stories", async (signal) => {
    const { data, error } = await supabase.from("generated_stories").select("*").order("id", { ascending: false }).limit(100).abortSignal(signal);
    if (error || !data?.length) throw error ?? new Error("Empty pool");
    return data.map(r => ({ id: r.id, title: r.title, subtitle: r.subtitle ?? "", content: r.content,
      category: r.category, country: r.country, tone: r.tone, read_minutes: r.read_minutes,
      image: r.image_url || FALLBACK_IMAGE, date: r.created_at.slice(0, 10) }));
  }, backupStories);
  const viewedIds = await viewedHistory("story", opts.userId);
  const rows = selectContent(pool, viewedIds, opts.country, limit);
  if (rows.length < REFILL_THRESHOLD) void triggerRefill("story", opts.country);
  return rows;
}

export async function getTodayStory(opts: {
  userId: string | null;
  country: string | null;
}): Promise<GStory | null> {
  const key = `today-story:${opts.userId ?? 'guest'}:${new Date().toISOString().slice(0, 10)}`;
  const previous = readLocal<GStory | null>(key, null);
  const feed = await getStoryFeed({ ...opts, limit: 100 });
  const pool = readLocal<GStory[]>('stories', backupStories);
  const same = previous && pool.find(s => s.id === previous.id);
  const pick = same || feed[0] || previous || backupStories[0] || null;
  if (pick) writeLocal(key, pick);
  return pick;
}

export async function markStoryViewed(userId: string, storyId: number) {
  rememberViewed("story", userId, storyId);
  if (storyId < 0) return;
  await cachedRead(`view-write:story:${userId}:${storyId}`, async (signal) => {
    const { error } = await supabase.from("viewed_stories")
      .upsert({ user_id: userId, story_id: storyId }, { onConflict: "user_id,story_id" }).abortSignal(signal);
    if (error) throw error;
    return true;
  }, false);
}

/* =========================================================================
 * TASKS
 * ========================================================================= */
export async function getTaskFeed(opts: {
  userId: string | null;
  country: string | null;
  limit?: number;
}): Promise<GTask[]> {
  const limit = opts.limit ?? 12;
  const pool = await cachedRead<GTask[]>("tasks", async (signal) => {
    const { data, error } = await supabase.from("generated_tasks").select("*").order("id", { ascending: false }).limit(200).abortSignal(signal);
    if (error || !data?.length) throw error ?? new Error("Empty pool");
    return data as GTask[];
  }, backupTasks);
  const excludeIds = await viewedHistory("task", opts.userId);
  const rows = selectContent(pool, excludeIds, opts.country, limit);
  if (rows.length < REFILL_THRESHOLD) void triggerRefill("task", opts.country);
  return rows;
}

export async function getTodayTask(opts: {
  userId: string | null;
  country: string | null;
}): Promise<GTask | null> {
  const key = `today-task:${opts.userId ?? 'guest'}:${new Date().toISOString().slice(0, 10)}`;
  const previous = readLocal<GTask | null>(key, null);
  const feed = await getTaskFeed({ ...opts, limit: 200 });
  const pool = readLocal<GTask[]>('tasks', backupTasks);
  const same = previous && pool.find(t => t.id === previous.id);
  const pick = same || feed[0] || previous || backupTasks[0] || null;
  if (pick) writeLocal(key, pick);
  return pick;
}

export async function markTaskViewed(userId: string, taskId: number) {
  rememberViewed("task", userId, taskId);
  if (taskId < 0) return;
  await cachedRead(`view-write:task:${userId}:${taskId}`, async (signal) => {
    const { error } = await supabase.from("viewed_tasks")
      .upsert({ user_id: userId, task_id: taskId }, { onConflict: "user_id,task_id" }).abortSignal(signal);
    if (error) throw error;
    return true;
  }, false);
}

/* =========================================================================
 * DAILY QUOTE (notification source)
 * ========================================================================= */
export async function getDailyQuote(opts: {
  userId: string | null;
  country: string | null;
}): Promise<GQuote | null> {
  const today = new Date().toISOString().slice(0, 10);
  const key = `daily-quote:${opts.userId ?? "guest"}:${today}`;
  if (opts.userId) {
    const existing = await cachedRead<GQuote | null>(key, async (signal) => {
      const { data: log, error } = await supabase.from("daily_quote_log").select("quote_id")
        .eq("user_id", opts.userId ?? "").eq("day", today).maybeSingle().abortSignal(signal);
      if (error) throw error;
      if (!log) return null;
      const { data, error: quoteError } = await supabase.from("generated_quotes").select("*")
        .eq("id", log.quote_id).maybeSingle().abortSignal(signal);
      if (quoteError) throw quoteError;
      return data ? mapQuote(data) : null;
    }, null);
    if (existing) return existing;
  }
  const feed = await getQuoteFeed({ ...opts, limit: 300 });
  const previous = readLocal<GQuote | null>(key, null);
  const pick = (previous && feed.find(q => q.id === previous.id)) || feed[0] || previous;
  if (pick) writeLocal(key, pick);
  if (pick && pick.id > 0 && opts.userId) {
    void cachedRead(`daily-write:${opts.userId}:${today}`, async (signal) => {
      const { error } = await supabase.from("daily_quote_log").upsert(
        { user_id: opts.userId ?? "", quote_id: pick.id, day: today, country: opts.country },
        { onConflict: "user_id,day" }).abortSignal(signal);
      if (error) throw error;
      return true;
    }, false);
  }
  return pick ?? null;
}

function mapQuote(r: {
  id: number;
  text: string;
  author: string;
  category: string[] | null;
  country: string | null;
  tone: string | null;
  image_url: string | null;
}): GQuote {
  return {
    id: r.id,
    text: r.text,
    author: r.author,
    category: r.category ?? [],
    country: r.country,
    tone: r.tone,
    image: r.image_url || FALLBACK_IMAGE,
  };
}


function selectContent<T extends { id: number; country: string | null }>(pool: T[], excluded: number[], country: string | null, limit: number): T[] {
  const unseen = pool.filter(row => !excluded.includes(row.id));
  return [...unseen.filter(row => country && row.country === country),
    ...unseen.filter(row => !country || row.country !== country)].slice(0, limit);
}

async function viewedHistory(type: "quote" | "story" | "task", userId: string | null): Promise<number[]> {
  if (!userId) return [];
  const local = localViewed(type, userId);
  const remote = await cachedRead<number[]>(`history:${type}:${userId}`, async (signal) => {
    if (type === "quote") {
      const { data, error } = await supabase.from("viewed_quotes").select("quote_id").eq("user_id", userId).abortSignal(signal);
      if (error) throw error;
      return (data ?? []).map(r => r.quote_id);
    }
    if (type === "story") {
      const { data, error } = await supabase.from("viewed_stories").select("story_id").eq("user_id", userId).abortSignal(signal);
      if (error) throw error;
      return (data ?? []).map(r => r.story_id);
    }
    const [viewed, completed] = await Promise.all([
      supabase.from("viewed_tasks").select("task_id").eq("user_id", userId).abortSignal(signal),
      supabase.from("task_submissions").select("task_id").eq("user_id", userId).eq("completed", true).abortSignal(signal),
    ]);
    if (viewed.error || completed.error) throw viewed.error ?? completed.error;
    return [...(viewed.data ?? []), ...(completed.data ?? [])].map(r => r.task_id);
  }, local);
  return [...new Set([...local, ...remote])];
}

export async function getFavoriteQuotes(ids: number[]): Promise<GQuote[]> {
  if (!ids.length) return [];
  const backup = readLocal<GQuote[]>("quotes", backupQuotes).filter(q => ids.includes(q.id));
  return cachedRead(`favorites:${ids.slice().sort((a, b) => a - b).join(",")}`, async (signal) => {
    const { data, error } = await supabase.from("generated_quotes").select("*").in("id", ids.filter(id => id > 0)).abortSignal(signal);
    if (error) throw error;
    return [...(data ?? []).map(mapQuote), ...backup.filter(q => q.id < 0)];
  }, backup);
}
