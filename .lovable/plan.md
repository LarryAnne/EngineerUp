# Phase 2 — Backend Integration Plan

Existing frontend (UI, animations, routing) stays untouched. We extend it with Lovable Cloud (Supabase under the hood).

## 1. Enable Lovable Cloud
Provisions Postgres, Auth, Storage. Generates `src/integrations/supabase/client.ts` automatically.

## 2. Database schema (migrations)
Tables exactly per spec (UUIDs, FKs, defaults):
- `profiles` (linked to `auth.users`, auto-created via trigger on signup)
- `quotes` (with `country`, `is_general`)
- `favorites` (unique on user_id+quote_id)
- `streaks`, `study_sessions`
- `reviews`, `contact_messages`
- `notifications`, `user_notifications`
- `tasks`, `task_submissions`

**RLS enabled on every table.** Policies:
- Users read/write only their own rows in personal tables (favorites, streaks, study_sessions, user_notifications, task_submissions)
- `profiles`: user can read all, update own
- `quotes`, `tasks`, `notifications`: public read
- `reviews`: public read, insert own, update/delete own
- `contact_messages`: anyone can insert; only owner reads own (admin role added later)

Trigger: on `auth.users` insert → create `profiles` row from raw_user_meta_data (username, country, contact).

Seed: copy current `src/data/quotes.ts` into `quotes` table (is_general=true) so the feed works after migration.

## 3. Storage buckets
- `avatars` (public)
- `task-proofs` (private, RLS by user folder)
- `review-media` (public, optional)

## 4. Services & hooks layer
New folders:
- `src/services/` — `quotes.ts`, `favorites.ts`, `streaks.ts`, `studySessions.ts`, `reviews.ts`, `contact.ts`, `notifications.ts`, `tasks.ts`, `auth.ts`, `storage.ts`
- `src/hooks/` — `useAuth`, `useFavorites`, `useStreak`, `useStudySession`, `useNotifications`, `useReviews`, `useTasks`, `useTheme` (already implicit)

**Hybrid mode**: each hook checks `useAuth().user`. If guest → localStorage path (current behavior). If authed → Supabase. Switch is transparent to UI.

## 5. Auth
- New routes `/login`, `/signup`, `/profile`, `/notifications`
- Signup form: username, email, password, country (African countries dropdown), contact
- Google OAuth button (uses Supabase managed Google provider — user enables in Cloud settings; we wire the call)
- `useAuth` exposes `user`, `profile`, `signIn`, `signUp`, `signInWithGoogle`, `signOut`
- `AppContext` updated to consume `useAuth` and migrate guest localStorage favorites into DB on first login

## 6. Personalization
`quotesService.getFeed()`:
- Guest → only `is_general=true`
- Authed → country-specific first, then general (single query ordered by `country = profile.country DESC`)

## 7. Notifications
- `notifications` table: global + country-targeted
- `useNotifications` returns unseen count + list filtered by user country / global
- `/notifications` page lists them; marking seen writes to `user_notifications`
- "Quote of the Day" surfaced via existing daily quote logic, extended to insert a notification row when a new day starts (client-side trigger acceptable for now)

## 8. Tasks with proof upload
- `Challenge` page extended:
  - Upload input → `task-proofs/{user_id}/{task_id}-{ts}.jpg`
  - "Mark as Completed" disabled until upload returns a URL
  - On click: insert `task_submissions` row with `completed=true`
- Guest users: upload disabled with prompt to sign in

## 9. Reviews & Contact
- Add a Reviews section (form + list) — placed inside existing About or a small section on Home, no layout redesign
- Existing Contact form (if any) wired to `contact_messages` insert; otherwise add minimal form on About page

## 10. Routing additions
- `src/routes/login.tsx`, `signup.tsx`, `profile.tsx`, `notifications.tsx`
- Navbar gets Login/Profile entry conditionally
- Protected routes: `/profile`, `/notifications` redirect guests to `/login`

## 11. Error handling
Toasts (sonner already installed) on: auth errors, upload failures, duplicate favorite, invalid rating, network errors.

## Technical notes
- Use generated `@/integrations/supabase/client` (no manual `supabaseClient.ts`; it's already the pattern Lovable Cloud uses, equivalent to the spec's request).
- `has_role` pattern reserved for future admin (no admin UI in this phase, but we add `app_role` enum + `user_roles` table + `has_role` function so policies for admin moderation already exist).
- All DB writes via services, never inline in components.

## Out of scope (deferred)
- Admin dashboard UI
- Email sending
- Push notifications