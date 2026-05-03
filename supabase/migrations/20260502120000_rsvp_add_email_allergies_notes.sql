-- Add email, allergies, and notes columns to rsvps table

alter table public.rsvps
  add column if not exists email      text,
  add column if not exists allergies  text,
  add column if not exists notes      text;
