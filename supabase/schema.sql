-- Run this once in the Supabase SQL editor.
-- Stores one row per completed quiz, exam, or flashcard session.

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  mode text not null check (mode in ('practice', 'exam', 'flashcards')),
  domain smallint check (domain between 1 and 5),   -- null = all domains
  total integer not null,
  correct integer not null,
  timed boolean not null default false,
  duration_seconds integer,
  domain_breakdown jsonb,                           -- {"1": {"correct": 5, "total": 8}, ...}
  created_at timestamptz not null default now()
);

create index if not exists attempts_user_created_idx on public.attempts (user_id, created_at desc);

alter table public.attempts enable row level security;

create policy "Users read own attempts" on public.attempts
  for select using (auth.uid() = user_id);

create policy "Users insert own attempts" on public.attempts
  for insert with check (auth.uid() = user_id);

create policy "Users delete own attempts" on public.attempts
  for delete using (auth.uid() = user_id);

-- Study notes: one row per user; content is {"sections": [{"id", "title", "body"}, ...]}.
create table if not exists public.notes (
  user_id uuid primary key references auth.users (id) on delete cascade default auth.uid(),
  content jsonb not null default '{"sections": []}',
  updated_at timestamptz not null default now()
);

alter table public.notes enable row level security;

create policy "Users read own notes" on public.notes
  for select using (auth.uid() = user_id);

create policy "Users insert own notes" on public.notes
  for insert with check (auth.uid() = user_id);

create policy "Users update own notes" on public.notes
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
