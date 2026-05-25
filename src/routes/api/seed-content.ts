import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { quotes as seedQuotes } from "@/data/quotes";
import { stories as seedStories } from "@/data/stories";
import { challenges as seedChallenges } from "@/data/challenges";

/**
 * POST /api/seed-content
 * One-time seed: if a generated_* table is empty, populate it from the static
 * src/data arrays so the app has content immediately while AI top-ups happen
 * lazily in the background.
 */

const SUPABASE_URL = process.env.SUPABASE_URL || "https://vgrahupbmefvithfvpdq.supabase.co";
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  "";

export const Route = createFileRoute("/api/seed-content")({
  server: {
    handlers: {
      POST: async () => {
        const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
          auth: { persistSession: false },
        });

        const result: Record<string, number> = {};

        // Quotes
        const { count: qc } = await supabase
          .from("generated_quotes")
          .select("id", { count: "exact", head: true });
        if (!qc) {
          const rows = seedQuotes.map((q) => ({
            text: q.text,
            author: q.author,
            category: q.category,
            image_url: q.image,
            generated_by: "seed",
          }));
          const { error } = await supabase.from("generated_quotes").insert(rows);
          if (error) return jsonError("quotes: " + error.message);
          result.quotes = rows.length;
        } else {
          result.quotes = 0;
        }

        // Stories
        const { count: sc } = await supabase
          .from("generated_stories")
          .select("id", { count: "exact", head: true });
        if (!sc) {
          const rows = seedStories.map((s) => ({
            title: s.title,
            subtitle: s.subtitle,
            content: s.content,
            category: s.category,
            image_url: s.image,
            read_minutes: Math.max(2, Math.round(s.content.split(/\s+/).length / 200)),
            generated_by: "seed",
          }));
          const { error } = await supabase.from("generated_stories").insert(rows);
          if (error) return jsonError("stories: " + error.message);
          result.stories = rows.length;
        } else {
          result.stories = 0;
        }

        // Tasks
        const { count: tc } = await supabase
          .from("generated_tasks")
          .select("id", { count: "exact", head: true });
        if (!tc) {
          const rows = seedChallenges.map((c) => ({
            title: c.title,
            description: c.description,
            category: c.category,
            difficulty: c.difficulty,
            minutes: c.difficulty === "Hard" ? 60 : c.difficulty === "Medium" ? 45 : 30,
            generated_by: "seed",
          }));
          const { error } = await supabase.from("generated_tasks").insert(rows);
          if (error) return jsonError("tasks: " + error.message);
          result.tasks = rows.length;
        } else {
          result.tasks = 0;
        }

        return new Response(JSON.stringify({ seeded: result }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});

function jsonError(msg: string) {
  return new Response(JSON.stringify({ error: msg }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}
