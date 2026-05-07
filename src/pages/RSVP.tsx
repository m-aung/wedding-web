import { useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import styles from './RSVP.module.css'
import { supabase } from '../lib/supabase'
import type { RsvpInsert } from '../lib/database.types'
import { WEDDING } from '../constants/couple'

const RSVP_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDLSHiy6jultd-Yd5b5adQpBM25F2TxLIfrc5ZlW1hlGlGtGRc1HtZ6zrYV_lcxTONGE7QM6EKhVbl9TAWS-NsEPkN_xeLI7h5QsUqz-9UMvtJTkRikJEtySFOt6cGRlJSUb7xVwTpPDkFw6bu-PQF6aEQsCUyl0uB2JiXhJWsSGDyX_eEynh1wVW4NhtYRRa7hk01iafCks-J0K24KKq6Ejo5yLSXuzBUttXDKMsCoO0MKmXZM5cjT5RF8Kk0RkRdsZVpBAcN2yhs'

type AttendanceOption = 'yes' | 'no' | ''

interface RsvpForm {
  fullName: string
  email: string
  attendance: AttendanceOption
  allergies: string
  songRequest: string
  notes: string
}

export default function RSVP() {
  const [form, setForm] = useState<RsvpForm>({
    fullName: '',
    email: '',
    attendance: '',
    allergies: '',
    songRequest: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.fullName.trim() || !form.attendance || !form.email.trim()) return

    setLoading(true)
    setError(null)

    const { data: validation, error: validationError } = await supabase.rpc(
      'validate_rsvp_guest',
      { p_name: form.fullName.trim(), p_email: form.email.trim() },
    )

    if (validationError) {
      setError('Something went wrong. Please try again or contact us directly.')
      setLoading(false)
      return
    }

    if (!validation.on_list) {
      setError("We couldn't find your name on our guest list. Please check your name or contact us directly.")
      setLoading(false)
      return
    }

    if (validation.already_rsvped) {
      setError('We already received an RSVP from this email address. Please contact us if you need to make a change.')
      setLoading(false)
      return
    }

    const payload: RsvpInsert = {
      full_name: form.fullName.trim(),
      email: form.email.trim(),
      attendance: form.attendance as 'yes' | 'no',
      allergies: form.allergies.trim() || null,
      song_request: form.songRequest.trim() || null,
      notes: form.notes.trim() || null,
    }

    const { error: dbError } = await supabase.from('rsvps').insert(payload)

    if (dbError) {
      setError('Something went wrong. Please try again or contact us directly.')
      setLoading(false)
      return
    }

    const emailParams = {
      guest_name: form.fullName,
      guest_email: form.email,
      attendance: form.attendance === 'yes' ? 'Accepts with pleasure' : 'Regretfully declines',
      allergies: form.allergies.trim() || 'None',
      song_request: form.songRequest.trim() || 'None',
      notes: form.notes.trim() || 'None',
      wedding_date: WEDDING.dateLong,
      wedding_venue: WEDDING.venueDisplay,
    }

    // Email failure is silent — DB is the source of truth
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_RSVP_GUEST_TEMPLATE_ID,
      { ...emailParams, to_email: form.email },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    ).catch(() => {})

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <section className="section" style={{ minHeight: '60svh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="title-sm">Thank you</p>
          <h1 className="display-md" style={{ marginTop: 16 }}>
            {form.attendance === 'yes'
              ? 'We cannot wait to celebrate with you.'
              : 'We will miss you dearly.'}
          </h1>
          <p className="body-lg" style={{ marginTop: 20 }}>
            Your response has been received, {form.fullName}.
          </p>
          <p className="body-lg" style={{ marginTop: 8, color: 'var(--on-surface-variant)' }}>
            A confirmation has been sent to {form.email}.
          </p>
        </div>
      </section>
    )
  }

  return (
    <div>
      {/* ── Page header ───────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroImg}>
          <img src={RSVP_IMG} alt="Wedding stationery" />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <p className="title-sm">Kindly respond by September First</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>
            The Pleasure<br />of Your Company
          </h1>
        </div>
      </section>

      {/* ── Form ──────────────────────────────────────────── */}
      <section className="section surface-low">
        <div className={`container ${styles.formSection}`}>
          <div className={styles.formInfo}>
            <p className="title-sm">Location &amp; Time</p>
            <p className="headline-md" style={{ marginTop: 12 }}>{WEDDING.venueDisplay}</p>
            <p className="body-lg" style={{ marginTop: 8, color: 'var(--on-surface-variant)' }}>
              {WEDDING.date} at {WEDDING.time}
            </p>
            <p className="body-lg" style={{ marginTop: 20 }}>
              We are so excited to celebrate our special day with the people we love most.
              Please fill out the form to let us know if you can make it.
            </p>
            <p className="body-lg" style={{ marginTop: 12 }}>
              A confirmation will be sent to your email once your RSVP is received.
              If you have any questions, please don't hesitate to reach out.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className={styles.fieldGroup}>
              <label htmlFor="fullName" className="input-label">Full Name</label>
              <input
                id="fullName"
                type="text"
                className="input-field"
                placeholder="Your full name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className={styles.fieldGroup}>
              <label htmlFor="email" className="input-label">Email Address</label>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                autoComplete="email"
              />
            </div>

            {/* Attendance */}
            <fieldset className={styles.fieldGroup} style={{ border: 'none' }}>
              <legend className="input-label" style={{ marginBottom: 16 }}>
                Will you attend?
              </legend>
              <div className={styles.radioGroup}>
                {(['yes', 'no'] as const).map((val) => (
                  <label key={val} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="attendance"
                      value={val}
                      checked={form.attendance === val}
                      onChange={() => setForm({ ...form, attendance: val })}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioMark} aria-hidden="true" />
                    <span className="body-lg" style={{ marginLeft: 12 }}>
                      {val === 'yes' ? 'Accepts with pleasure' : 'Regretfully declines'}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Allergies & Song Request — only when attending */}
            {form.attendance === 'yes' && (
              <>
                <div className={styles.fieldGroup}>
                  <label htmlFor="allergies" className="input-label">Allergies &amp; Dietary Restrictions</label>
                  <textarea
                    id="allergies"
                    className="input-field"
                    rows={3}
                    placeholder="Please list any allergies or dietary requirements…"
                    value={form.allergies}
                    onChange={(e) => setForm({ ...form, allergies: e.target.value })}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="songRequest" className="input-label">Song Request</label>
                  <input
                    id="songRequest"
                    type="text"
                    className="input-field"
                    placeholder="What song will fill the dance floor?"
                    value={form.songRequest}
                    onChange={(e) => setForm({ ...form, songRequest: e.target.value })}
                  />
                </div>
              </>
            )}

            {/* Notes */}
            <div className={styles.fieldGroup}>
              <label htmlFor="notes" className="input-label">Notes</label>
              <textarea
                id="notes"
                className="input-field"
                rows={4}
                placeholder="Anything else you'd like us to know…"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            {error && (
              <p className={styles.errorMsg} role="alert">{error}</p>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{ marginTop: 8, alignSelf: 'flex-start' }}
              disabled={loading}
            >
              {loading ? 'Sending…' : 'Send RSVP'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
