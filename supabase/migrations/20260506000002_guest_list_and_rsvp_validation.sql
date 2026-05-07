-- guest_list: pre-populated list of invited guests
-- No anon read policy — validation goes through the security definer function below.
create table public.guest_list (
  id    uuid primary key default gen_random_uuid(),
  name  text not null,
  email text
);

alter table public.guest_list enable row level security;

-- Prevent the same email from RSVPing twice at the DB level
alter table public.rsvps
  add constraint rsvps_email_unique unique (email);

-- validate_rsvp_guest: called by the RSVP form before insert.
-- security definer lets it read guest_list without exposing the table to anon.
create or replace function public.validate_rsvp_guest(p_name text, p_email text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_on_list        boolean;
  v_already_rsvped boolean;
begin
  select exists(
    select 1 from public.guest_list
    where lower(trim(name)) = lower(trim(p_name))
  ) into v_on_list;

  select exists(
    select 1 from public.rsvps
    where lower(trim(email)) = lower(trim(p_email))
  ) into v_already_rsvped;

  return jsonb_build_object(
    'on_list',        v_on_list,
    'already_rsvped', v_already_rsvped
  );
end;
$$;

grant execute on function public.validate_rsvp_guest(text, text) to anon;
