-- ========================================
-- Phase 3 — Content Generation Engine
-- Apply this in Lovable Cloud → Database → SQL Editor (or via psql)
-- ========================================

create table if not exists public.generated_quotes (
  id bigserial primary key,
  text text not null,
  author text not null default 'Unknown',
  category text[] not null default '{}',
  country text,
  tone text,
  image_url text,
  generated_by text not null default 'seed',
  times_served int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.generated_stories (
  id bigserial primary key,
  title text not null,
  subtitle text not null default '',
  content text not null,
  category text not null default 'Resilience',
  country text,
  tone text,
  read_minutes int not null default 4,
  image_url text,
  generated_by text not null default 'seed',
  created_at timestamptz not null default now()
);

create table if not exists public.generated_tasks (
  id bigserial primary key,
  title text not null,
  description text not null,
  category text not null default 'Study',
  difficulty text not null default 'Easy',
  minutes int not null default 30,
  country text,
  generated_by text not null default 'seed',
  created_at timestamptz not null default now()
);

create table if not exists public.viewed_quotes (
  user_id uuid not null references auth.users(id) on delete cascade,
  quote_id bigint not null references public.generated_quotes(id) on delete cascade,
  viewed_at timestamptz not null default now(),
  primary key (user_id, quote_id)
);

create table if not exists public.viewed_stories (
  user_id uuid not null references auth.users(id) on delete cascade,
  story_id bigint not null references public.generated_stories(id) on delete cascade,
  viewed_at timestamptz not null default now(),
  primary key (user_id, story_id)
);

create table if not exists public.viewed_tasks (
  user_id uuid not null references auth.users(id) on delete cascade,
  task_id bigint not null references public.generated_tasks(id) on delete cascade,
  viewed_at timestamptz not null default now(),
  primary key (user_id, task_id)
);

create table if not exists public.daily_quote_log (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  quote_id bigint not null references public.generated_quotes(id) on delete cascade,
  day date not null default current_date,
  country text,
  created_at timestamptz not null default now(),
  unique (user_id, day)
);

alter table public.generated_quotes enable row level security;
alter table public.generated_stories enable row level security;
alter table public.generated_tasks  enable row level security;
alter table public.viewed_quotes    enable row level security;
alter table public.viewed_stories   enable row level security;
alter table public.viewed_tasks     enable row level security;
alter table public.daily_quote_log  enable row level security;

drop policy if exists "read generated_quotes" on public.generated_quotes;
create policy "read generated_quotes" on public.generated_quotes for select using (true);
drop policy if exists "insert generated_quotes" on public.generated_quotes;
create policy "insert generated_quotes" on public.generated_quotes for insert to authenticated with check (true);

drop policy if exists "read generated_stories" on public.generated_stories;
create policy "read generated_stories" on public.generated_stories for select using (true);
drop policy if exists "insert generated_stories" on public.generated_stories;
create policy "insert generated_stories" on public.generated_stories for insert to authenticated with check (true);

drop policy if exists "read generated_tasks" on public.generated_tasks;
create policy "read generated_tasks" on public.generated_tasks for select using (true);
drop policy if exists "insert generated_tasks" on public.generated_tasks;
create policy "insert generated_tasks" on public.generated_tasks for insert to authenticated with check (true);

drop policy if exists "own viewed_quotes" on public.viewed_quotes;
create policy "own viewed_quotes" on public.viewed_quotes
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own viewed_stories" on public.viewed_stories;
create policy "own viewed_stories" on public.viewed_stories
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own viewed_tasks" on public.viewed_tasks;
create policy "own viewed_tasks" on public.viewed_tasks
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "read daily_quote_log" on public.daily_quote_log;
create policy "read daily_quote_log" on public.daily_quote_log
  for select using (user_id is null or auth.uid() = user_id);

drop policy if exists "insert daily_quote_log" on public.daily_quote_log;
create policy "insert daily_quote_log" on public.daily_quote_log
  for insert to authenticated with check (auth.uid() = user_id);

create index if not exists idx_gq_country on public.generated_quotes(country);
create index if not exists idx_gs_country on public.generated_stories(country);
create index if not exists idx_gt_country on public.generated_tasks(country);
create index if not exists idx_vq_user on public.viewed_quotes(user_id);
create index if not exists idx_vs_user on public.viewed_stories(user_id);
create index if not exists idx_vt_user on public.viewed_tasks(user_id);
