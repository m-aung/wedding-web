-- Initial schema: rsvps table
-- Applied directly via Supabase SQL Editor; this file backfills the local migration history.

create table if not exists public.rsvps (
  id           uuid primary key default gen_random_uuid(),
  full_name    text not null,
  attendance   text not null check (attendance in ('yes', 'no')),
  meal_choice  text,
  song_request text,
  created_at   timestamptz not null default now()
);

alter table public.rsvps enable row level security;

create policy "guests can insert rsvps"
  on public.rsvps
  for insert
  to anon
  with check (true);

create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);
