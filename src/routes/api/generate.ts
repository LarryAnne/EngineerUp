import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/generate
 * Body: { type: 'quote' | 'story' | 'task', count?: number, country?: string }
 *
 * Calls Lovable AI Gateway to generate fresh content, then inserts into the
 * corresponding generated_* table via the Supabase service role (server-only).
 */

const SUPABASE_URL = process.env.SUPABASE_URL || "https://vgrahupbmefvithfvpdq.supabase.co";
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  "";

const QUOTE_SYSTEM = `You write motivational quotes for African university students.
Realism, emotional intelligence, no clichés. Reference universal African student
struggles subtly (financial pressure, unstable electricity/internet, long commutes,
family expectations, academic burnout, balancing side hustle and school).
BAD: "Never give up."
GOOD: "Some semesters are survived, not conquered. What matters is showing up again tomorrow."`;

const STORY_SYSTEM = `You write short, believable fictional stories about African
university students. Each story follows struggle → effort → outcome.
Discipline and consistency over success fantasy. 250-400 words, plain prose.
Examples of arcs: failing first semester then recovering GPA, studying with limited
resources, balancing a side hustle and school. Avoid stereotypes.`;

const TASK_SYSTEM = `You write small, realistic, measurable daily productivity tasks
for African university students. Each task must be actionable, time-bounded,
and achievable in a student context (limited time, possible power/internet issues).
GOOD: "Study one difficult course for 45 minutes without touching social media."
BAD: "Study all day until success comes."`;

const AFRICAN_IMAGES = [
  "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1200&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
  "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1200&q=80",
  "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1200&q=80",
  "https://images.unsplash.com/photo-1543269664-7eef42226a21?w=1200&q=80",
  "https://images.unsplash.com/photo-1610484826917-0f101a7a3c0a?w=1200&q=80",
  "https://images.unsplash.com/photo-1597393353415-b3730f3719fe?w=1200&q=80",
];

function pickImage() {
  return AFRICAN_IMAGES[Math.floor(Math.random() * AFRICAN_IMAGES.length)];
}

async function callAiJson(systemPrompt: string, userPrompt: string): Promise<unknown> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI gateway ${res.status}: ${text.slice(0, 200)}`);
  }
  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content ?? "{}";
  return JSON.parse(content);
}

async function generateQuotes(count: number, country: string | null) {
  const userPrompt = `Generate ${count} distinct quotes as JSON: {"items":[{"text":string,"author":string,"category":string[],"tone":string}]}. Categories pick 1-2 from: Discipline, Consistency, Failure, Exams, Stress, Family, Focus, Resilience, Burnout, Hope. tone is one of: gentle, fierce, reflective, practical, hopeful. ${country ? `Context country: ${country}.` : ""}`;
  const json = (await callAiJson(QUOTE_SYSTEM, userPrompt)) as {
    items?: Array<{ text: string; author?: string; category?: string[]; tone?: string }>;
  };
  return (json.items ?? []).map((q) => ({
    text: q.text,
    author: q.author || "Anonymous",
    category: q.category ?? [],
    tone: q.tone ?? null,
    country,
    image_url: pickImage(),
    generated_by: "ai",
  }));
}

async function generateStories(count: number, country: string | null) {
  const userPrompt = `Generate ${count} short stories as JSON: {"items":[{"title":string,"subtitle":string,"content":string,"category":string,"tone":string,"read_minutes":number}]}. category from: Academic Resilience, Discipline, Side Hustle, Recovery, Focus, Family. content 250-400 words, paragraphs separated by \\n\\n. ${country ? `Context country: ${country}.` : ""}`;
  const json = (await callAiJson(STORY_SYSTEM, userPrompt)) as {
    items?: Array<{
      title: string;
      subtitle?: string;
      content: string;
      category?: string;
      tone?: string;
      read_minutes?: number;
    }>;
  };
  return (json.items ?? []).map((s) => ({
    title: s.title,
    subtitle: s.subtitle ?? "",
    content: s.content,
    category: s.category ?? "Academic Resilience",
    tone: s.tone ?? null,
    read_minutes: s.read_minutes ?? 4,
    country,
    image_url: pickImage(),
    generated_by: "ai",
  }));
}

async function generateTasks(count: number, country: string | null) {
  const userPrompt = `Generate ${count} distinct daily tasks as JSON: {"items":[{"title":string,"description":string,"category":string,"difficulty":"Easy"|"Medium"|"Hard","minutes":number}]}. category from: Study, Programming, Mathematics, Reading, Health, Discipline, Networking, Reflection. ${country ? `Context country: ${country}.` : ""}`;
  const json = (await callAiJson(TASK_SYSTEM, userPrompt)) as {
    items?: Array<{
      title: string;
      description: string;
      category?: string;
      difficulty?: "Easy" | "Medium" | "Hard";
      minutes?: number;
    }>;
  };
  return (json.items ?? []).map((t) => ({
    title: t.title,
    description: t.description,
    category: t.category ?? "Study",
    difficulty: t.difficulty ?? "Easy",
    minutes: t.minutes ?? 30,
    country,
    generated_by: "ai",
  }));
}

export const Route = createFileRoute("/api/generate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            type?: "quote" | "story" | "task";
            count?: number;
            country?: string;
          };
          const type = body.type;
          const count = Math.min(Math.max(body.count ?? 5, 1), 10);
          const country = body.country?.trim() || null;

          if (type !== "quote" && type !== "story" && type !== "task") {
            return new Response(JSON.stringify({ error: "Invalid type" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
            auth: { persistSession: false },
          });

          let rows: unknown[] = [];
          let table = "";
          if (type === "quote") {
            rows = await generateQuotes(count, country);
            table = "generated_quotes";
          } else if (type === "story") {
            rows = await generateStories(count, country);
            table = "generated_stories";
          } else {
            rows = await generateTasks(count, country);
            table = "generated_tasks";
          }

          if (rows.length === 0) {
            return new Response(JSON.stringify({ inserted: 0 }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          const { data, error } = await supabase.from(table).insert(rows).select("id");
          if (error) throw new Error(error.message);

          return new Response(
            JSON.stringify({ inserted: data?.length ?? 0, type }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err) {
          const message = err instanceof Error ? err.message : "unknown";
          return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
