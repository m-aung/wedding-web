CREATE OR REPLACE FUNCTION public.transfer_rsvp_email(
  p_name      text,
  p_old_email text,
  p_new_email text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_rsvp     public.rsvps%ROWTYPE;
  v_conflict boolean;
BEGIN
  -- Find the RSVP matching old email + name
  SELECT * INTO v_rsvp
  FROM public.rsvps
  WHERE lower(trim(email))     = lower(trim(p_old_email))
    AND lower(trim(full_name)) = lower(trim(p_name))
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error_code', 'not_found', 'existing_rsvp', null);
  END IF;

  -- Check the new email isn't already in use
  SELECT EXISTS (
    SELECT 1 FROM public.rsvps
    WHERE lower(trim(email)) = lower(trim(p_new_email))
  ) INTO v_conflict;

  IF v_conflict THEN
    RETURN jsonb_build_object('success', false, 'error_code', 'new_email_taken', 'existing_rsvp', null);
  END IF;

  -- Update the email
  UPDATE public.rsvps
  SET email = lower(trim(p_new_email))
  WHERE id = v_rsvp.id
  RETURNING * INTO v_rsvp;

  RETURN jsonb_build_object(
    'success',       true,
    'error_code',    null,
    'existing_rsvp', to_jsonb(v_rsvp)
  );
END;
$$;
