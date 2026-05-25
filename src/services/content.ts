import { supabase } from "@/integrations/supabase/client";

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

async function ensureSeeded(table: string) {
  const { count } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true });
  if (!count) {
    try {
      await fetch("/api/seed-content", { method: "POST" });
    } catch {
      /* ignore */
    }
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
  await ensureSeeded("generated_quotes");

  let viewedIds: number[] = [];
  if (opts.userId) {
    const { data: v } = await supabase
      .from("viewed_quotes")
      .select("quote_id")
      .eq("user_id", opts.userId);
    viewedIds = (v ?? []).map((r: { quote_id: number }) => r.quote_id);
  }

  let q = supabase.from("generated_quotes").select("*");
  if (viewedIds.length) q = q.not("id", "in", `(${viewedIds.join(",")})`);
  const { data, error } = await q.limit(limit * 2);
  if (error) throw error;

  let rows = (data ?? []) as Array<{
    id: number;
    text: string;
    author: string;
    category: string[] | null;
    country: string | null;
    tone: string | null;
    image_url: string | null;
  }>;

  // Country prioritization
  if (opts.country) {
    rows = [
      ...rows.filter((r) => r.country === opts.country),
      ...rows.filter((r) => r.country !== opts.country),
    ];
  }

  // Top-up if pool of unseen is thin
  if (rows.length < REFILL_THRESHOLD) {
    void triggerRefill("quote", opts.country);
  }

  return rows.slice(0, limit).map((r) => ({
    id: r.id,
    text: r.text,
    author: r.author,
    category: r.category ?? [],
    country: r.country,
    tone: r.tone,
    image: r.image_url || FALLBACK_IMAGE,
  }));
}

export async function markQuoteViewed(userId: string, quoteId: number) {
  await supabase
    .from("viewed_quotes")
    .upsert({ user_id: userId, quote_id: quoteId }, { onConflict: "user_id,quote_id" });
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
  await ensureSeeded("generated_stories");

  let viewedIds: number[] = [];
  if (opts.userId) {
    const { data: v } = await supabase
      .from("viewed_stories")
      .select("story_id")
      .eq("user_id", opts.userId);
    viewedIds = (v ?? []).map((r: { story_id: number }) => r.story_id);
  }

  let q = supabase.from("generated_stories").select("*");
  if (viewedIds.length) q = q.not("id", "in", `(${viewedIds.join(",")})`);
  const { data, error } = await q.limit(limit * 2);
  if (error) throw error;

  let rows = (data ?? []) as Array<{
    id: number;
    title: string;
    subtitle: string;
    content: string;
    category: string;
    country: string | null;
    tone: string | null;
    read_minutes: number;
    image_url: string | null;
    created_at: string;
  }>;

  if (opts.country) {
    rows = [
      ...rows.filter((r) => r.country === opts.country),
      ...rows.filter((r) => r.country !== opts.country),
    ];
  }

  if (rows.length < REFILL_THRESHOLD) {
    void triggerRefill("story", opts.country);
  }

  return rows.slice(0, limit).map((r) => ({
    id: r.id,
    title: r.title,
    subtitle: r.subtitle,
    content: r.content,
    category: r.category,
    country: r.country,
    tone: r.tone,
    read_minutes: r.read_minutes,
    image: r.image_url || FALLBACK_IMAGE,
    date: r.created_at?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
  }));
}

export async function getTodayStory(opts: {
  userId: string | null;
  country: string | null;
}): Promise<GStory | null> {
  const feed = await getStoryFeed({ ...opts, limit: 1 });
  return feed[0] ?? null;
}

export async function markStoryViewed(userId: string, storyId: number) {
  await supabase
    .from("viewed_stories")
    .upsert({ user_id: userId, story_id: storyId }, { onConflict: "user_id,story_id" });
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
  await ensureSeeded("generated_tasks");

  // Tasks: exclude both already-viewed AND already-completed.
  let excludeIds: number[] = [];
  if (opts.userId) {
    const [{ data: viewed }, { data: completed }] = await Promise.all([
      supabase.from("viewed_tasks").select("task_id").eq("user_id", opts.userId),
      supabase
        .from("task_submissions")
        .select("task_id")
        .eq("user_id", opts.userId)
        .eq("completed", true),
    ]);
    excludeIds = [
      ...(viewed ?? []).map((r: { task_id: number }) => r.task_id),
      ...(completed ?? []).map((r: { task_id: number }) => r.task_id),
    ];
  }

  let q = supabase.from("generated_tasks").select("*");
  if (excludeIds.length) q = q.not("id", "in", `(${excludeIds.join(",")})`);
  const { data, error } = await q.limit(limit * 2);
  if (error) throw error;

  let rows = (data ?? []) as Array<{
    id: number;
    title: string;
    description: string;
    category: string;
    difficulty: "Easy" | "Medium" | "Hard";
    minutes: number;
    country: string | null;
  }>;

  if (opts.country) {
    rows = [
      ...rows.filter((r) => r.country === opts.country),
      ...rows.filter((r) => r.country !== opts.country),
    ];
  }

  if (rows.length < REFILL_THRESHOLD) {
    void triggerRefill("task", opts.country);
  }

  return rows.slice(0, limit);
}

export async function getTodayTask(opts: {
  userId: string | null;
  country: string | null;
}): Promise<GTask | null> {
  const feed = await getTaskFeed({ ...opts, limit: 1 });
  return feed[0] ?? null;
}

export async function markTaskViewed(userId: string, taskId: number) {
  await supabase
    .from("viewed_tasks")
    .upsert({ user_id: userId, task_id: taskId }, { onConflict: "user_id,task_id" });
}

/* =========================================================================
 * DAILY QUOTE (notification source)
 * ========================================================================= */
export async function getDailyQuote(opts: {
  userId: string | null;
  country: string | null;
}): Promise<GQuote | null> {
  const today = new Date().toISOString().slice(0, 10);

  if (opts.userId) {
    const { data: existing } = await supabase
      .from("daily_quote_log")
      .select("quote_id")
      .eq("user_id", opts.userId)
      .eq("day", today)
      .maybeSingle();
    if (existing?.quote_id) {
      const { data } = await supabase
        .from("generated_quotes")
        .select("*")
        .eq("id", existing.quote_id)
        .maybeSingle();
      if (data) return mapQuote(data);
    }
  }

  const feed = await getQuoteFeed({ ...opts, limit: 1 });
  const pick = feed[0] ?? null;
  if (pick && opts.userId) {
    await supabase
      .from("daily_quote_log")
      .upsert(
        { user_id: opts.userId, quote_id: pick.id, day: today, country: opts.country },
        { onConflict: "user_id,day" },
      );
  }
  return pick;
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
