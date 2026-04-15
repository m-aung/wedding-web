-- Run this in the Supabase SQL Editor:
-- Dashboard → SQL Editor → New query → paste & run

-- 1. Create the rsvps table
create table if not exists public.rsvps (
  id           uuid primary key default gen_random_uuid(),
  full_name    text not null,
  attendance   text not null check (attendance in ('yes', 'no')),
  meal_choice  text,
  song_request text,
  created_at   timestamptz not null default now()
);

-- 2. Enable Row Level Security
alter table public.rsvps enable row level security;

-- 3. Allow anyone (guests) to INSERT — but never read / update / delete
create policy "guests can insert rsvps"
  on public.rsvps
  for insert
  to anon
  with check (true);

-- 4. Only the authenticated service-role (you, in the dashboard) can SELECT
-- No explicit SELECT policy needed for anon → they simply cannot read rows.

-- 5. Helpful index for the dashboard: sort by latest first
create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);
