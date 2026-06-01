import { useState, useRef, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { useTranslation } from 'react-i18next'
import styles from './RSVP.module.css'
import { supabase } from '../lib/supabase'
import type { RsvpRow } from '../lib/database.types'
import { WEDDING, COUPLE_EMAIL } from '../constants/couple'

const RSVP_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDLSHiy6jultd-Yd5b5adQpBM25F2TxLIfrc5ZlW1hlGlGtGRc1HtZ6zrYV_lcxTONGE7QM6EKhVbl9TAWS-NsEPkN_xeLI7h5QsUqz-9UMvtJTkRikJEtySFOt6cGRlJSUb7xVwTpPDkFw6bu-PQF6aEQsCUyl0uB2JiXhJWsSGDyX_eEynh1wVW4NhtYRRa7hk01iafCks-J0K24KKq6Ejo5yLSXuzBUttXDKMsCoO0MKmXZM5cjT5RF8Kk0RkRdsZVpBAcN2yhs'

const RSVP_DEADLINE = new Date('2026-08-01T23:59:59')

type Phase = 'lookup' | 'form' | 'success' | 'contact-us'
type AttendanceOption = 'yes' | 'no' | ''

interface RsvpForm {
  fullName: string
  email: string
  attendance: AttendanceOption
  plusOne: boolean
  kidsCount: number
  allergies: string
  songRequest: string
  notes: string
}

export default function RSVP() {
  const { t } = useTranslation()
  const isDeadlinePassed = new Date() > RSVP_DEADLINE

  const [phase, setPhase] = useState<Phase>('lookup')
  const [existingRsvpId, setExistingRsvpId] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [submittedAttendance, setSubmittedAttendance] = useState<'yes' | 'no'>('yes')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{ fullName?: string; email?: string }>({})
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<RsvpForm>({
    fullName: '',
    email: '',
    attendance: '',
    plusOne: false,
    kidsCount: 0,
    allergies: '',
    songRequest: '',
    notes: '',
  })

  // ── Phase 1: look up the guest ────────────────────────────────────

  const validateLookup = () => {
    const errors: { fullName?: string; email?: string } = {}
    if (!form.fullName.trim()) errors.fullName = t('rsvp.errors.nameRequired')
    if (!form.email.trim()) errors.email = t('rsvp.errors.emailRequired')
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = t('rsvp.errors.emailInvalid')
    setFieldErrors(errors)
    if (errors.fullName) nameRef.current?.focus()
    else if (errors.email) emailRef.current?.focus()
    return Object.keys(errors).length === 0
  }

  const handleLookup = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateLookup()) return

    setLoading(true)
    setError(null)

    const { data, error: rpcError } = await supabase.rpc('validate_rsvp_guest', {
      p_name: form.fullName.trim(),
      p_email: form.email.trim(),
    })

    setLoading(false)

    if (rpcError || !data) {
      setError(t('rsvp.errors.generic'))
      return
    }

    // Scenario 3c — not on the invitation list
    if (!data.on_list) {
      setError(t('rsvp.errors.notOnList'))
      return
    }

    // Scenario 3b — data inconsistency; contact us
    if (data.rsvp_count > 1) {
      setPhase('contact-us')
      return
    }

    // Scenario 3a — one RSVP already on file; pre-fill for editing
    if (data.rsvp_count === 1 && data.existing_rsvp) {
      const ex = data.existing_rsvp as RsvpRow
      setForm(f => ({
        ...f,
        attendance: ex.attendance,
        plusOne: ex.plus_one,
        kidsCount: ex.kids_count,
        allergies: ex.allergies ?? '',
        songRequest: ex.song_request ?? '',
        notes: ex.notes ?? '',
      }))
      setExistingRsvpId(ex.id)
      setIsEditing(true)
    } else {
      setIsEditing(false)
      setExistingRsvpId(null)
    }

    setPhase('form')
  }

  // ── Phase 2: submit / update RSVP ────────────────────────────────

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.attendance) return

    setLoading(true)
    setError(null)

    const attendance = form.attendance as 'yes' | 'no'
    const attending = attendance === 'yes'

    const fields = {
      attendance,
      plus_one:     attending ? form.plusOne    : false,
      kids_count:   attending ? form.kidsCount  : 0,
      allergies:    attending ? (form.allergies.trim()   || null) : null,
      song_request: attending ? (form.songRequest.trim() || null) : null,
      notes:        form.notes.trim() || null,
    }

    if (isEditing && existingRsvpId) {
      const { data: ok, error: updateError } = await supabase.rpc('update_rsvp', {
        p_id:           existingRsvpId,
        p_email:        form.email.trim(),
        p_attendance:   fields.attendance,
        p_plus_one:     fields.plus_one,
        p_kids_count:   fields.kids_count,
        p_allergies:    fields.allergies,
        p_song_request: fields.song_request,
        p_notes:        fields.notes,
      })

      if (updateError || !ok) {
        setError(t('rsvp.errors.generic'))
        setLoading(false)
        return
      }
    } else {
      const { error: dbError } = await supabase.from('rsvps').insert({
        full_name: form.fullName.trim(),
        email:     form.email.trim(),
        ...fields,
      })

      if (dbError) {
        setError(t('rsvp.errors.generic'))
        setLoading(false)
        return
      }
    }

    // Confirmation email — failure is silent, DB is source of truth
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_RSVP_GUEST_TEMPLATE_ID,
      {
        to_email:     form.email,
        guest_name:   form.fullName,
        attendance:   attending ? 'Accepts with pleasure' : 'Regretfully declines',
        plus_one:     fields.plus_one ? 'Yes' : 'No',
        kids:         fields.kids_count > 0 ? String(fields.kids_count) : 'None',
        allergies:    fields.allergies    ?? 'None',
        song_request: fields.song_request ?? 'None',
        notes:        fields.notes        ?? 'None',
        wedding_date:  WEDDING.dateLong,
        wedding_venue: WEDDING.venueDisplay,
        forward_line: attending
          ? 'We look forward to celebrating with you on'
          : "We're so sorry you won't be able to join us.",
        farewell_line: attending
          ? 'We cannot wait to share this unforgettable day with you.'
          : "You'll be in our hearts on that special day.",
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    ).catch(() => {})

    setSubmittedAttendance(attendance)
    setLoading(false)
    setPhase('success')
  }

  // ── Full-page states ──────────────────────────────────────────────

  if (phase === 'success') {
    return (
      <section className="section" style={{ minHeight: '60svh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="title-sm">{t('rsvp.success.heading')}</p>
          <h1 className="display-md" style={{ marginTop: 16 }}>
            {submittedAttendance === 'yes'
              ? t('rsvp.success.attending')
              : t('rsvp.success.notAttending')}
          </h1>
          <p className="body-lg" style={{ marginTop: 20 }}>
            {isEditing
              ? t('rsvp.success.updated', { name: form.fullName })
              : t('rsvp.success.message', { name: form.fullName })}
          </p>
          <p className="body-lg" style={{ marginTop: 8, color: 'var(--on-surface-variant)' }}>
            {t('rsvp.success.confirmation', { email: form.email })}
          </p>
        </div>
      </section>
    )
  }

  if (phase === 'contact-us') {
    return (
      <section className="section" style={{ minHeight: '60svh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="material-icons" style={{ fontSize: 40, color: 'var(--on-surface-variant)' }}>mail_outline</span>
          <h1 className="display-md" style={{ marginTop: 16 }}>{t('rsvp.contactUs.title')}</h1>
          <p className="body-lg" style={{ marginTop: 20, maxWidth: 520, margin: '20px auto 0' }}>
            {t('rsvp.contactUs.message')}
          </p>
          <a
            href={`mailto:${COUPLE_EMAIL}`}
            className="btn-primary"
            style={{ marginTop: 32, display: 'inline-block' }}
          >
            {COUPLE_EMAIL}
          </a>
        </div>
      </section>
    )
  }

  // ── Deadline passed ───────────────────────────────────────────────

  if (isDeadlinePassed) {
    return (
      <section className="section" style={{ minHeight: '60svh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="material-icons" style={{ fontSize: 40, color: 'var(--on-surface-variant)' }}>event_busy</span>
          <h1 className="display-md" style={{ marginTop: 16 }}>{t('rsvp.deadlinePassed.title')}</h1>
          <p className="body-lg" style={{ marginTop: 20, maxWidth: 520, margin: '20px auto 0' }}>
            {t('rsvp.deadlinePassed.message')}
          </p>
          <a
            href={`mailto:${COUPLE_EMAIL}`}
            className="btn-primary"
            style={{ marginTop: 32, display: 'inline-block' }}
          >
            {COUPLE_EMAIL}
          </a>
        </div>
      </section>
    )
  }

  // ── Main layout (lookup + form phases) ───────────────────────────

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroImg}>
          <img src={RSVP_IMG} alt="Wedding stationery" />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <p className="title-sm">{t('rsvp.deadline')}</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>{t('rsvp.pageTitle')}</h1>
        </div>
      </section>

      <section className="section surface-low">
        <div className={`container ${styles.formSection}`}>
          <div className={styles.formInfo}>
            <p className="title-sm">{t('rsvp.formInfo.title')}</p>
            <p className="headline-md" style={{ marginTop: 12 }}>{t('common.venueDisplay')}</p>
            <p className="body-lg" style={{ marginTop: 8, color: 'var(--on-surface-variant)' }}>
              {t('common.weddingDate')} at {t('common.weddingTime')}
            </p>
            <p className="body-lg" style={{ marginTop: 20 }}>{t('rsvp.formInfo.description1')}</p>
            <p className="body-lg" style={{ marginTop: 12 }}>{t('rsvp.formInfo.description2')}</p>
          </div>

          {/* ── Lookup phase ─────────────────────────────────────── */}
          {phase === 'lookup' && (
            <form className={styles.form} onSubmit={handleLookup} noValidate>
              <div>
                <p className="headline-md">{t('rsvp.lookup.title')}</p>
                <p className="body-lg" style={{ color: 'var(--on-surface-variant)', marginTop: 8 }}>
                  {t('rsvp.lookup.subtitle')}
                </p>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="fullName" className="input-label">{t('rsvp.form.fullName')}</label>
                <input
                  ref={nameRef}
                  id="fullName"
                  type="text"
                  className={`input-field${fieldErrors.fullName ? ` ${styles.inputInvalid}` : ''}`}
                  placeholder={t('rsvp.form.fullNamePlaceholder')}
                  value={form.fullName}
                  onChange={e => { setForm({ ...form, fullName: e.target.value.replace(/[^\p{L}\s]/gu, '') }); setFieldErrors(fe => ({ ...fe, fullName: undefined })) }}
                  onBlur={() => { if (!form.fullName.trim()) setFieldErrors(fe => ({ ...fe, fullName: t('rsvp.errors.nameRequired') })) }}
                  required
                  autoComplete="name"
                />
                {fieldErrors.fullName && <p className={styles.fieldError} role="alert">{fieldErrors.fullName}</p>}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="email" className="input-label">{t('rsvp.form.email')}</label>
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  className={`input-field${fieldErrors.email ? ` ${styles.inputInvalid}` : ''}`}
                  placeholder={t('rsvp.form.emailPlaceholder')}
                  value={form.email}
                  onChange={e => { setForm({ ...form, email: e.target.value }); setFieldErrors(fe => ({ ...fe, email: undefined })) }}
                  onBlur={() => {
                    if (!form.email.trim()) setFieldErrors(fe => ({ ...fe, email: t('rsvp.errors.emailRequired') }))
                    else if (!/\S+@\S+\.\S+/.test(form.email)) setFieldErrors(fe => ({ ...fe, email: t('rsvp.errors.emailInvalid') }))
                  }}
                  required
                  autoComplete="email"
                />
                {fieldErrors.email && <p className={styles.fieldError} role="alert">{fieldErrors.email}</p>}
              </div>

              {error && <p className={styles.errorMsg} role="alert">{error}</p>}

              <button
                type="submit"
                className="btn-primary"
                style={{ alignSelf: 'flex-start' }}
                disabled={loading}
              >
                {loading && <span className={styles.spinner} aria-hidden="true" />}
                {loading ? t('rsvp.lookup.checking') : t('rsvp.lookup.button')}
              </button>
            </form>
          )}

          {/* ── Form phase ───────────────────────────────────────── */}
          {phase === 'form' && (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {isEditing && (
                <div className={styles.editBanner}>
                  <span className="material-icons" style={{ fontSize: 18, flexShrink: 0 }}>edit_note</span>
                  <p className="body-lg">{t('rsvp.form.editBanner')}</p>
                </div>
              )}

              {/* Attendance */}
              <div className={styles.fieldGroup}>
                <span className="input-label">{t('rsvp.form.attendance')}</span>
                <div className={styles.toggleGroup}>
                  {(['yes', 'no'] as const).map(val => (
                    <button
                      key={val}
                      type="button"
                      className={`${styles.toggleBtn}${form.attendance === val ? ` ${styles.toggleBtnSelected}` : ''}`}
                      onClick={() => setForm({ ...form, attendance: val })}
                    >
                      {val === 'yes' ? t('rsvp.form.attendanceYes') : t('rsvp.form.attendanceNo')}
                    </button>
                  ))}
                </div>
              </div>

              {form.attendance === 'yes' && (
                <>
                  {/* Plus one */}
                  <div className={styles.fieldGroup}>
                    <span className="input-label">{t('rsvp.form.plusOne')}</span>
                    <div className={styles.toggleGroup}>
                      {([false, true] as const).map(val => (
                        <button
                          key={String(val)}
                          type="button"
                          className={`${styles.toggleBtn}${form.plusOne === val ? ` ${styles.toggleBtnSelected}` : ''}`}
                          onClick={() => setForm({ ...form, plusOne: val })}
                        >
                          {val ? t('rsvp.form.plusOneYes') : t('rsvp.form.plusOneNo')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kids count */}
                  <div className={styles.fieldGroup}>
                    <span className="input-label">{t('rsvp.form.kids')}</span>
                    <div className={styles.stepper}>
                      <button
                        type="button"
                        className={styles.stepperBtn}
                        aria-label="Decrease"
                        onClick={() => setForm(f => ({ ...f, kidsCount: Math.max(0, f.kidsCount - 1) }))}
                        disabled={form.kidsCount === 0}
                      >
                        <span className="material-icons">remove</span>
                      </button>
                      <span className={`body-lg ${styles.stepperVal}`} aria-live="polite">
                        {form.kidsCount}
                      </span>
                      <button
                        type="button"
                        className={styles.stepperBtn}
                        aria-label="Increase"
                        onClick={() => setForm(f => ({ ...f, kidsCount: Math.min(3, f.kidsCount + 1) }))}
                        disabled={form.kidsCount === 3}
                      >
                        <span className="material-icons">add</span>
                      </button>
                    </div>
                    <p className="title-sm" style={{ marginTop: 8 }}>{t('rsvp.form.kidsNote')}</p>
                  </div>

                  {/* Allergies */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="allergies" className="input-label">{t('rsvp.form.allergies')}</label>
                    <textarea
                      id="allergies"
                      className="input-field"
                      rows={3}
                      placeholder={t('rsvp.form.allergiesPlaceholder')}
                      value={form.allergies}
                      onChange={e => setForm({ ...form, allergies: e.target.value })}
                    />
                  </div>

                  {/* Song request */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="songRequest" className="input-label">{t('rsvp.form.songRequest')}</label>
                    <input
                      id="songRequest"
                      type="text"
                      className="input-field"
                      placeholder={t('rsvp.form.songRequestPlaceholder')}
                      value={form.songRequest}
                      onChange={e => setForm({ ...form, songRequest: e.target.value })}
                    />
                  </div>
                </>
              )}

              {/* Notes */}
              <div className={styles.fieldGroup}>
                <label htmlFor="notes" className="input-label">{t('rsvp.form.notes')}</label>
                <textarea
                  id="notes"
                  className="input-field"
                  rows={4}
                  placeholder={t('rsvp.form.notesPlaceholder')}
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              {error && <p className={styles.errorMsg} role="alert">{error}</p>}

              <div className={styles.formActions}>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => { setPhase('lookup'); setError(null) }}
                >
                  {t('rsvp.form.back')}
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading || !form.attendance}
                >
                  {loading && <span className={styles.spinner} aria-hidden="true" />}
                  {loading
                    ? t('rsvp.form.sending')
                    : isEditing
                    ? t('rsvp.form.update')
                    : t('rsvp.form.submit')}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
