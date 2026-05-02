-- accommodations: hotel/stay recommendations shown on the Travel & Registry page
create table public.accommodations (
  id           uuid primary key default gen_random_uuid(),
  sort_order   int  not null default 0,
  is_visible   bool not null default true,
  created_at   timestamptz not null default now(),
  tagline      text not null,
  name         text not null,
  description  text not null,
  image_url    text not null,
  booking_url  text not null,
  meta_1_label text not null,
  meta_1_value text not null,
  meta_2_label text not null,
  meta_2_value text not null,
  cta_text     text not null default 'Book This Stay',
  cta_variant  text not null default 'primary'
);
alter table public.accommodations enable row level security;
create policy "Public read" on public.accommodations
  for select using (is_visible = true);

-- accommodation_requests: guest form submissions for accommodation help
create table public.accommodation_requests (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  guest_name       text not null,
  email            text not null,
  party_size       int  not null default 1,
  notes            text,
  accommodation_id uuid references public.accommodations(id) on delete set null
);
alter table public.accommodation_requests enable row level security;
create policy "Guest insert" on public.accommodation_requests
  for insert with check (true);

-- registry_items: gift registry entries (regular items + honeymoon fund)
create table public.registry_items (
  id          uuid primary key default gen_random_uuid(),
  sort_order  int  not null default 0,
  is_visible  bool not null default true,
  created_at  timestamptz not null default now(),
  subtitle    text not null,
  title       text not null,
  store_name  text not null,
  store_url   text not null,
  image_url   text,
  is_fund     bool not null default false,
  description text
);
alter table public.registry_items enable row level security;
create policy "Public read" on public.registry_items
  for select using (is_visible = true);

-- travel_tips: getting-here tips shown on the Travel & Registry page
create table public.travel_tips (
  id          uuid primary key default gen_random_uuid(),
  sort_order  int  not null default 0,
  is_visible  bool not null default true,
  created_at  timestamptz not null default now(),
  icon        text not null,
  title       text not null,
  body        text not null
);
alter table public.travel_tips enable row level security;
create policy "Public read" on public.travel_tips
  for select using (is_visible = true);

-- ── Seed data (current hardcoded content) ─────────────────────────────────

insert into public.accommodations
  (tagline, name, description, image_url, booking_url,
   meta_1_label, meta_1_value, meta_2_label, meta_2_value,
   cta_text, cta_variant, sort_order)
values
  ('Est. 1894', 'The Heritage House',
   'Located in the heart of the historic district, just a five-minute stroll from the ceremony venue. A blend of classic charm and modern luxury.',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuAHRWYuisPbeuVDuEsFuL5xmCFrFd6rfdQFIjDeijtG2Og5XRbwgodsxaeSokiIl4PP0dZ0nxFj2c3nH_KugdvdZGEjZMM-SJIzmEi_CgeAUMAoytMBxfGnnN63VPdVhyDNGS2idZYjHa-7GhLmsqzvD6MpDti4NKbIslndkxf5UFrxTQ-QHhvYH0t-JdB47XhwgAZYaIcs4P-Reocixmir45Jjpq0zgs8beeiTUMGV4t8mn0bofDWZW8qn87kxQ1mQLXuHvvavD4g',
   'https://www.marriott.com/',
   'Booking Code', 'MYOYOON24', 'Cut-off Date', 'August 15, 2024',
   'Book This Stay', 'primary', 1),

  ('Modern Minimal', 'Vellum Suites',
   'For those seeking a contemporary retreat. Vellum offers minimalist interiors and panoramic views of the valley.',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuCqqOyUUf__8j4oshblPlD92xEnDu2r7qwLxeXRkcH9CP8CnKsm1P5QOKCtKnVv05Fd67MFpFNiSFQBv7SihhlxMyqHn2zX3NC32Tlzqo4bdwQyLhAQiJ2rQY6wSZhiu3iyfkVYtM3OFCvTd3VnEB7yiwvJ2hlFyMfw2koTPJfqZpsNe4wMCFl-pz7ISxqXkXtM8KjfVsoFHkPN000wKMoLnxZh6eJico91v-T14oVwrAkfOnKMjDnPx08wcbGjVuWPRTc',
   'https://www.hilton.com/',
   'Booking', 'Click to Access', 'Shuttle Service', 'Available',
   'Explore Availability', 'ghost', 2);

insert into public.travel_tips (icon, title, body, sort_order) values
  ('flight',         'Air Travel',
   'The closest international airport is Portsmith (PHX), approximately 45 minutes from the venue.', 1),
  ('directions_car', 'Transport',
   'We recommend using ride-share apps or renting a car for flexibility during the weekend.', 2),
  ('cloud',          'Weather',
   'Expect crisp autumn weather. Evenings can be cool, ranging from 55°F to 65°F.', 3),
  ('info',           'Assistance',
   'For any travel-related questions, please contact our coordinator at travel@myoandyoon.com.', 4);

insert into public.registry_items
  (subtitle, title, store_name, store_url, image_url, is_fund, description, sort_order)
values
  ('Bespoke Tableware', 'The Kitchen Set', 'Williams Sonoma',
   'https://www.williams-sonoma.com/registry/',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuAzzebFoNBx_oTdE2328zlomqAab5n4e3GyULH2TUIaFGRMU9ELWAZjVO61hgYio7G_lGwgBeSrM8OgloB1iH_XpdTqJVzTxPX7iA9V-gGAzqX1hpnulH6KcsMk77vAv9KWgBWRrVa5h8XXtSfU6FD4o7LTjVIYKNJxqWX-dUbAxPg8yC9_uEY9snRWEtjyi5Rm-9wvZUmx4_6KwYnphdnCquctSKopPvNYbr491IoOKac99isL5rZ5SPgnYWiEkFWNtjerQKGU2d4',
   false, null, 1),

  ('Italian Cotton Suite', 'Linen & Textures', 'Crate & Barrel',
   'https://www.crateandbarrel.com/gift-registry/',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Os94hejCAg6TJ_MwvuwoUIDsHqDi7OAcQx2KvliUhy9smnsvQdAQb-qAXM69UMTFoC8jCGW28o4BSOi8XLRQusg-vi3UkpwUBIFxVis2uxhlXod4cORlWrMwTE3NUVwcTH53eklQ-MOOTyMcw4TQuWEnCZXG2xfvdAnxkzJOelI6AJaa2VYVETtzp5knFKMhJ_7XtNJKqrIJNmaw8QjS8t3Dy05vtgxgzXlfeiKvCeNk8iAH1e3WHCxmJFdyoCUL0iUiBzhjQQw',
   false, null, 2),

  ('Art & Glassware', 'Home Gallery', 'Zola',
   'https://www.zola.com/registry/',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuDiwxnM03kDo2W48rEEj9qv8okUc2aweuiNfPu18SU4y73sKVpZJDymZS4c6AwyZ-4O7vfEXkI5sDI3p5eYDc6j_DyXgV0iQXkbIOc88EcKQiS0rv8fnFd7VHNT92ZVmEZuENAUKiWWsjz-lx6q2180QkMxnkNV9q4yynTiABDh-ibzZOKUeCLwgAhCfs6kxBZxh5GH9aDSs28jcMhfH4VPCshrJJxK7TkOZJE1MJLSL8rbPH_ViaBdVuMrnCf3XR6nu8NFD49O4',
   false, null, 3),

  ('Experiential', 'Honeymoon Fund', 'Zola',
   'https://www.zola.com/registry/',
   null, true,
   'If you''d prefer to contribute to our first journey as a married couple, we have created a fund for our adventures in the Amalfi Coast.',
   4);
