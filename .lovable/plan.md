
# Phase 3 — Living Content Engine

Replace static arrays with an AI-driven, personalized, non-repeating content pipeline backed by Lovable Cloud + Lovable AI Gateway.

## 1. Backend (Lovable Cloud)

### New tables (migrations)
- `generated_quotes` — id, text, author, category[], country (nullable), tone, created_at, generated_by (ai|seed), times_served
- `generated_stories` — id, title, body, tone, country (nullable), read_minutes, created_at, generated_by
- `generated_tasks` — id, title, description, difficulty (easy|medium|hard), minutes, pressure_level, category, country (nullable), created_at
- `viewed_quotes` — user_id, quote_id, viewed_at (PK user_id+quote_id)
- `viewed_stories` — user_id, story_id, viewed_at
- `viewed_tasks` — user_id, task_id, viewed_at (separate from completion)
- `daily_quote_log` — user_id (nullable for guest/global), quote_id, day (date), country
- `task_submissions` already exists — extend with `proof_url NOT NULL` enforcement (column already there)

All `viewed_*` and `*_submissions` have RLS (own rows only). `generated_*` tables: public read, server-only insert via service role.

### Storage
- Reuse existing `task-proofs` bucket (private, user-folder RLS).

## 2. AI Generation Layer (server functions, NOT in components)

`src/lib/generation/*.functions.ts` using `createServerFn` + Lovable AI Gateway (`google/gemini-2.5-flash`, free during promo):

- `generateQuotes({ count, country, categories })` — returns N quotes, inserts into `generated_quotes`
- `generateStories({ count, country })` — same pattern
- `generateTasks({ count, country, difficulty })` — same pattern

Each calls the AI gateway with a strict JSON-schema prompt enforcing the realism rules from the brief (African student context, no clichés, struggle→effort→outcome, measurable tasks).

### Feed server functions (called by UI)
- `getQuoteFeed({ limit })` — returns unseen quotes for user (country-prioritized), tops up via generator if pool < threshold, logs views
- `getStoryFeed({ limit })`
- `getTaskFeed({ limit })`
- `getDailyQuote()` — picks/generates the day's quote, writes to `daily_quote_log`, ensures not repeated within 30 days
- `markQuoteViewed`, `markStoryViewed`, `markTaskViewed`
- `submitTaskCompletion({ taskId, proofUrl })` — requires non-empty proof_url

All user-context fns use `requireSupabaseAuth`; guest variants use `supabaseAdmin` and skip `viewed_*` tracking.

### Top-up strategy (anti-exhaustion)
On feed fetch: if `unseen_for_user < 10`, fire-and-forget `generateX` to refill the global pool. Idempotent via short-lived `generation_locks` row (or simple count check).

## 3. Frontend Wiring

- Delete usage of `src/data/quotes.ts`, `src/data/stories.ts`, `src/data/challenges.ts` from pages (keep files as seeds — see §5).
- New hooks: `useQuoteFeed`, `useStoryFeed`, `useTaskFeed`, `useDailyQuote` — all wrap server fns via TanStack Query.
- `Quotes`, `Stories`, `Challenge`, `Motivation`, `Home` pages switched to hooks. No layout changes.
- `Challenge` page: upload-required gate already exists in `AppContext.markTaskComplete` (proofUrl param). Enforce in UI — disable "Mark Completed" until upload succeeds and returns a URL from `task-proofs/{userId}/{taskId}-{ts}`.

## 4. Africa-centered imagery
Generated content (quotes/stories) `image_url` field populated from a curated pool of African-student stock images stored in `public/generated/` (dark, brown, light-skinned). Generator picks at random by tone. No AI image generation per quote (cost) — rotating curated pool.

## 5. Seed data
On first run, copy current `src/data/quotes.ts` + `stories.ts` + `challenges.ts` into the generated_* tables so the app works instantly while AI top-ups happen in background.

## 6. Daily Quote Notification
- `getDailyQuote()` server fn runs on Home mount (client trigger acceptable for now per existing plan).
- Inserts row into existing `notifications` + `user_notifications` so it shows in the Notifications page bell.

## 7. Out of scope (deferred to Phase 4)
- Admin moderation UI (schema is ready)
- Email/push delivery of daily quote
- pg_cron scheduled mass generation (currently lazy/on-demand top-up)

## Technical notes
- Lovable AI Gateway via `LOVABLE_API_KEY` (server env). Model: `google/gemini-2.5-flash`. Structured output via `response_format: json_schema`.
- All inserts use `supabaseAdmin` from server fns; reads honoring RLS use `requireSupabaseAuth` client.
- Anti-repetition query pattern: `SELECT * FROM generated_quotes q WHERE NOT EXISTS (SELECT 1 FROM viewed_quotes v WHERE v.user_id = $uid AND v.quote_id = q.id) ORDER BY (country = $userCountry) DESC, random() LIMIT $n`.
- All generation fns return typed results; failures fall back to existing pool (never block UI).
