-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  country text,
  contact text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "profiles readable by authed" on public.profiles
  for select to authenticated using (true);
create policy "profiles insert own" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "profiles update own" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, country, contact)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'country',
    new.raw_user_meta_data->>'contact'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Favorites
create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  quote_id bigint not null,
  created_at timestamptz not null default now(),
  primary key (user_id, quote_id)
);
alter table public.favorites enable row level security;
create policy "own favorites" on public.favorites
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Task submissions
create table if not exists public.task_submissions (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  task_id bigint not null,
  completed boolean not null default true,
  proof_url text,
  created_at timestamptz not null default now()
);
alter table public.task_submissions enable row level security;
create policy "own task_submissions" on public.task_submissions
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists idx_ts_user on public.task_submissions(user_id);

-- Streaks
create table if not exists public.streaks (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_streak int not null default 0,
  last_visit date,
  updated_at timestamptz not null default now()
);
alter table public.streaks enable row level security;
create policy "own streaks" on public.streaks
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Reviews
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  rating int not null check (rating between 1 and 5),
  comment text,
  author_name text,
  created_at timestamptz not null default now()
);
alter table public.reviews enable row level security;
create policy "reviews readable" on public.reviews for select using (true);
create policy "reviews insert own" on public.reviews
  for insert to authenticated with check (auth.uid() = user_id);
create policy "reviews update own" on public.reviews
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "reviews delete own" on public.reviews
  for delete to authenticated using (auth.uid() = user_id);

-- Contact messages
create table if not exists public.contact_messages (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "anyone can submit contact" on public.contact_messages
  for insert to anon, authenticated with check (true);

-- Notifications
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  country text,
  created_at timestamptz not null default now()
);
alter table public.notifications enable row level security;
create policy "notifications readable" on public.notifications for select using (true);