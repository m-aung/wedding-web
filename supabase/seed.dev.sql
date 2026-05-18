-- Dev seed data — run this in your DEV Supabase project only.
--
-- After running the migration, add a test guest so you can exercise
-- every RSVP scenario without touching production data.
--
-- Scenarios you can test:
--   3a (edit)       — submit with "Test Guest / test@example.com", then
--                     come back and submit again to trigger edit mode.
--   3b (duplicate)  — manually INSERT a second rsvps row for the same
--                     email via the SQL editor to test the contact-us path.
--   3c (not on list)— use any name that is NOT in guest_list.

INSERT INTO public.guest_list (name, email)
VALUES ('Test Guest', 'test@example.com')
ON CONFLICT DO NOTHING;
