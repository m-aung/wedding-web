-- Drop the registry_items table and its policies
drop policy if exists "Public read" on public.registry_items;
drop table if exists public.registry_items;
