-- Migration: plus_one, kids_count, and edit-RSVP support
-- 2026-05-17
--
-- What this adds:
--   1. rsvps.plus_one      boolean (default false)
--   2. rsvps.kids_count    smallint 0–3 (default 0)
--   3. rsvps.updated_at    timestamptz (null until first edit)
--   4. validate_rsvp_guest — new return shape:
--        { on_list, rsvp_count, existing_rsvp }
--      replaces { on_list, already_rsvped }
--   5. update_rsvp()       — new security-definer fn for anon edits

-- ── 1. Schema changes ─────────────────────────────────────────────

ALTER TABLE public.rsvps
  ADD COLUMN IF NOT EXISTS plus_one   boolean   NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS kids_count smallint  NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz;

ALTER TABLE public.rsvps
  DROP CONSTRAINT IF EXISTS rsvps_kids_count_check;

ALTER TABLE public.rsvps
  ADD CONSTRAINT rsvps_kids_count_check CHECK (kids_count >= 0 AND kids_count <= 3);

-- ── 2. validate_rsvp_guest (breaking return-type change) ──────────
--
-- Old: { on_list: bool, already_rsvped: bool }
-- New: { on_list: bool, rsvp_count: int, existing_rsvp: jsonb | null }
--
-- Must DROP + CREATE because the return type changes.

DROP FUNCTION IF EXISTS public.validate_rsvp_guest(text, text);

CREATE OR REPLACE FUNCTION public.validate_rsvp_guest(p_name text, p_email text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_on_list    boolean;
  v_count      integer;
  v_existing   jsonb;
BEGIN
  -- Is the guest's name on the invitation list?
  SELECT EXISTS (
    SELECT 1 FROM public.guest_list
    WHERE lower(trim(name)) = lower(trim(p_name))
  ) INTO v_on_list;

  -- How many RSVPs are already filed under this email?
  SELECT COUNT(*) INTO v_count
  FROM public.rsvps
  WHERE lower(trim(email)) = lower(trim(p_email));

  -- Fetch the existing row when exactly one RSVP is on record.
  IF v_count = 1 THEN
    SELECT to_jsonb(r) INTO v_existing
    FROM public.rsvps r
    WHERE lower(trim(r.email)) = lower(trim(p_email))
    LIMIT 1;
  END IF;

  RETURN jsonb_build_object(
    'on_list',       v_on_list,
    'rsvp_count',    v_count,
    'existing_rsvp', v_existing
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.validate_rsvp_guest(text, text) TO anon;

-- ── 3. update_rsvp — lets anon guests edit their own RSVP ─────────
--
-- Security model: caller must supply the RSVP's UUID *and* the
-- email it was filed under. Both must match the same row — that's
-- the only "auth" we need for a public wedding site.

CREATE OR REPLACE FUNCTION public.update_rsvp(
  p_id           uuid,
  p_email        text,
  p_attendance   text,
  p_plus_one     boolean,
  p_kids_count   smallint,
  p_allergies    text,
  p_song_request text,
  p_notes        text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.rsvps
  SET
    attendance   = p_attendance,
    plus_one     = p_plus_one,
    kids_count   = p_kids_count,
    allergies    = p_allergies,
    song_request = p_song_request,
    notes        = p_notes,
    updated_at   = now()
  WHERE id  = p_id
    AND lower(trim(email)) = lower(trim(p_email));

  RETURN FOUND;
END;
$$;

GRANT EXECUTE ON FUNCTION public.update_rsvp(uuid, text, text, boolean, smallint, text, text, text) TO anon;
