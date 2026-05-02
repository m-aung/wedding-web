import { useState, useEffect, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import styles from './TravelRegistry.module.css'
import { supabase } from '../lib/supabase'
import type {
  AccommodationRow,
  AccommodationRequestInsert,
  RegistryItemRow,
  TravelTipRow,
} from '../lib/database.types'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC-3rBcBWfy9Lx8nTDGVfNcpos6864OogHeB9eOAx3TQXhyTnGfkyJkT8qrvc9cI5cuGrCSEW4NrzJXh10jpPhgJCjepzhs1MLZmWPV88ItpEd2dDH8JQawjEabg5-Eb5c7QUBK7bL655I6PhrgXn-HclV_h_gty5SKCdVPN-1RrzbBnlWjnuAa7LLoVeAZqX2ZpOm2D7axXV_IsNchUdnnyslFoWB7c_ol8St2JeHP0K30plDHYIXKj3NQyaTzHliYTDCnaONnTLo'

interface RequestForm {
  guestName: string
  email: string
  partySize: number
  accommodationId: string
  notes: string
}

function HotelSkeleton() {
  return (
    <div className={`${styles.hotels} ${styles.skeletonPulse}`}>
      {[0, 1].map((i) => (
        <div key={i} className={styles.hotelCard}>
          <div className={`${styles.hotelImg} ${styles.skeletonBlock}`} />
          <div className={styles.hotelInfo}>
            <div className={styles.skeletonBlock} style={{ height: 12, width: '30%', marginBottom: 12 }} />
            <div className={styles.skeletonBlock} style={{ height: 22, width: '70%', marginBottom: 16 }} />
            <div className={styles.skeletonBlock} style={{ height: 14, width: '90%', marginBottom: 8 }} />
            <div className={styles.skeletonBlock} style={{ height: 14, width: '75%', marginBottom: 8 }} />
            <div className={styles.hotelMeta}>
              <div className={styles.skeletonBlock} style={{ height: 36, width: 100 }} />
              <div className={styles.skeletonBlock} style={{ height: 36, width: 100 }} />
            </div>
            <div className={styles.skeletonBlock} style={{ height: 44, width: 140, marginTop: 24 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function TipsSkeleton() {
  return (
    <div className={`${styles.tips} ${styles.skeletonPulse}`}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={styles.tip}>
          <div className={styles.skeletonBlock} style={{ width: 24, height: 24, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div className={styles.skeletonBlock} style={{ height: 12, width: '40%', marginBottom: 10 }} />
            <div className={styles.skeletonBlock} style={{ height: 14, width: '90%', marginBottom: 6 }} />
            <div className={styles.skeletonBlock} style={{ height: 14, width: '65%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function RegistrySkeleton() {
  return (
    <div className={`${styles.registry} ${styles.skeletonPulse}`} style={{ marginTop: 48 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} className={styles.registryCard}>
          <div className={`${styles.registryImg} ${styles.skeletonBlock}`} />
          <div className={styles.registryInfo}>
            <div className={styles.skeletonBlock} style={{ height: 12, width: '35%', marginBottom: 12 }} />
            <div className={styles.skeletonBlock} style={{ height: 20, width: '65%', marginBottom: 24 }} />
            <div className={styles.skeletonBlock} style={{ height: 36, width: 120 }} />
          </div>
        </div>
      ))}
      <div className={`${styles.registryCard} ${styles.skeletonBlock}`} style={{ minHeight: 200 }} />
    </div>
  )
}

export default function TravelRegistry() {
  const [accommodations, setAccommodations] = useState<AccommodationRow[]>([])
  const [travelTips, setTravelTips] = useState<TravelTipRow[]>([])
  const [registryItems, setRegistryItems] = useState<RegistryItemRow[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const [requestForm, setRequestForm] = useState<RequestForm>({
    guestName: '',
    email: '',
    partySize: 1,
    accommodationId: '',
    notes: '',
  })
  const [requestLoading, setRequestLoading] = useState(false)
  const [requestError, setRequestError] = useState<string | null>(null)
  const [requestSubmitted, setRequestSubmitted] = useState(false)

  useEffect(() => {
    async function fetchAll() {
      const [a, t, r] = await Promise.all([
        supabase.from('accommodations').select('*').eq('is_visible', true).order('sort_order'),
        supabase.from('travel_tips').select('*').eq('is_visible', true).order('sort_order'),
        supabase.from('registry_items').select('*').eq('is_visible', true).order('sort_order'),
      ])
      if (a.error || t.error || r.error) {
        setFetchError('Could not load page content. Please refresh.')
      } else {
        setAccommodations(a.data)
        setTravelTips(t.data)
        setRegistryItems(r.data)
      }
      setLoadingData(false)
    }
    fetchAll()
  }, [])

  async function handleRequestSubmit(e: FormEvent) {
    e.preventDefault()
    if (!requestForm.guestName.trim() || !requestForm.email.trim()) return

    setRequestLoading(true)
    setRequestError(null)

    const payload: AccommodationRequestInsert = {
      guest_name: requestForm.guestName.trim(),
      email: requestForm.email.trim(),
      party_size: requestForm.partySize,
      notes: requestForm.notes.trim() || null,
      accommodation_id: requestForm.accommodationId || null,
    }

    const { error: dbError } = await supabase.from('accommodation_requests').insert(payload)

    if (dbError) {
      setRequestError('Something went wrong. Please try again.')
      setRequestLoading(false)
      return
    }

    try {
      const preferredHotel = requestForm.accommodationId
        ? (accommodations.find((a) => a.id === requestForm.accommodationId)?.name ?? 'No preference')
        : 'No preference'

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          guest_name: requestForm.guestName,
          guest_email: requestForm.email,
          party_size: String(requestForm.partySize),
          accommodation: preferredHotel,
          notes: requestForm.notes.trim() || 'None',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
    } catch {
      // Email failure is silent — DB record is the source of truth
    }

    setRequestSubmitted(true)
    setRequestLoading(false)
  }

  const regularItems = registryItems.filter((i) => !i.is_fund)
  const fundItem = registryItems.find((i) => i.is_fund)

  return (
    <div>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroImg}>
          <img src={HERO_IMG} alt="Travel and accommodations" />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <p className="title-sm">Travel &amp; Accommodations</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>Stay With Us</h1>
        </div>
      </section>

      {/* ── Accommodations ─────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <p className="title-sm">Where to Stay</p>
          <p className="body-lg" style={{ marginTop: 8, maxWidth: 640 }}>
            We have curated a selection of beautiful stays near our venue. To ensure your
            comfort, we have secured limited room blocks at our favourite local haunts.
          </p>

          {fetchError ? (
            <p className="body-lg" style={{ color: 'var(--tertiary)', marginTop: 32 }}>{fetchError}</p>
          ) : loadingData ? (
            <HotelSkeleton />
          ) : (
            <div className={styles.hotels}>
              {accommodations.map((item) => (
                <div key={item.id} className={styles.hotelCard}>
                  <div className={styles.hotelImg}>
                    <img src={item.image_url} alt={item.name} />
                  </div>
                  <div className={styles.hotelInfo}>
                    <p className="title-sm">{item.tagline}</p>
                    <h2 className="headline-md" style={{ marginTop: 8 }}>{item.name}</h2>
                    <p className="body-lg" style={{ marginTop: 12 }}>{item.description}</p>
                    <div className={styles.hotelMeta}>
                      <div>
                        <p className="label-md">{item.meta_1_label}</p>
                        <p className="body-lg" style={{ marginTop: 4 }}>{item.meta_1_value}</p>
                      </div>
                      <div>
                        <p className="label-md">{item.meta_2_label}</p>
                        <p className="body-lg" style={{ marginTop: 4 }}>{item.meta_2_value}</p>
                      </div>
                    </div>
                    <a
                      href={item.booking_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={item.cta_variant === 'primary' ? 'btn-primary' : 'btn-ghost'}
                      style={{ marginTop: 24, display: 'inline-flex' }}
                    >
                      {item.cta_text}
                      <span className="material-icons" aria-hidden="true">arrow_right_alt</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Accommodation Request Form ──────────────────────── */}
      <section className="section surface-low">
        <div className="container">
          <div className={styles.requestSection}>
            <div className={styles.requestInfo}>
              <p className="title-sm">Need Help?</p>
              <h2 className="headline-lg" style={{ marginTop: 12 }}>Request Accommodation</h2>
              <p className="body-lg" style={{ marginTop: 16 }}>
                If you need assistance finding accommodation or have questions about the
                options available, let us know and we will be in touch.
              </p>
            </div>

            <div className={styles.requestFormWrap}>
              {requestSubmitted ? (
                <div className={styles.requestSuccess}>
                  <p className="title-sm">Received</p>
                  <p className="headline-md" style={{ marginTop: 8 }}>
                    Thank you, {requestForm.guestName}.
                  </p>
                  <p className="body-lg" style={{ marginTop: 12 }}>
                    We will be in touch soon with accommodation details.
                  </p>
                </div>
              ) : (
                <form className={styles.requestForm} onSubmit={handleRequestSubmit} noValidate>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="guestName" className="input-label">Guest Name</label>
                    <input
                      id="guestName"
                      type="text"
                      className="input-field"
                      placeholder="Your full name"
                      value={requestForm.guestName}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, guestName: e.target.value }))}
                      required
                      autoComplete="name"
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="reqEmail" className="input-label">Email Address</label>
                    <input
                      id="reqEmail"
                      type="email"
                      className="input-field"
                      placeholder="your@email.com"
                      value={requestForm.email}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="partySize" className="input-label">Party Size</label>
                    <input
                      id="partySize"
                      type="number"
                      className="input-field"
                      min={1}
                      max={20}
                      value={requestForm.partySize}
                      onChange={(e) =>
                        setRequestForm(prev => ({ ...prev, partySize: Math.max(1, Number(e.target.value)) }))
                      }
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="accommodationPref" className="input-label">Accommodation Preference</label>
                    <select
                      id="accommodationPref"
                      className="input-field"
                      value={requestForm.accommodationId}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, accommodationId: e.target.value }))}
                      disabled={loadingData}
                    >
                      <option value="">No preference</option>
                      {accommodations.map((a) => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="reqNotes" className="input-label">Questions or Notes</label>
                    <textarea
                      id="reqNotes"
                      className="input-field"
                      rows={4}
                      placeholder="Any special requirements or questions…"
                      value={requestForm.notes}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>

                  {requestError && (
                    <p
                      style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}
                      role="alert"
                    >
                      {requestError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ alignSelf: 'flex-start' }}
                    disabled={requestLoading}
                  >
                    {requestLoading ? 'Sending…' : 'Send Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Travel tips ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <p className="title-sm">Getting Here</p>
          <h2 className="headline-lg" style={{ marginTop: 12, marginBottom: 48 }}>
            Travel Information
          </h2>
          {loadingData ? (
            <TipsSkeleton />
          ) : (
            <div className={styles.tips}>
              {travelTips.map((tip) => (
                <div key={tip.id} className={styles.tip}>
                  <span
                    className="material-icons"
                    style={{ color: 'var(--secondary)', fontSize: 24 }}
                    aria-hidden="true"
                  >
                    {tip.icon}
                  </span>
                  <div>
                    <p className="title-sm" style={{ marginBottom: 8 }}>{tip.title}</p>
                    <p className="body-lg">{tip.body}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Registry ───────────────────────────────────────── */}
      <section className="section surface-low">
        <div className="container">
          <p className="title-sm">Registry</p>
          <h2 className="headline-lg" style={{ marginTop: 12 }}>A Curated Collection</h2>
          <p className="body-lg" style={{ marginTop: 16, maxWidth: 600 }}>
            Your presence is the greatest gift of all. If you wish to honor us with a gift,
            we have selected pieces that will help us build our home and future together.
          </p>

          {loadingData ? (
            <RegistrySkeleton />
          ) : (
            <div className={styles.registry}>
              {regularItems.map((item) => (
                <div key={item.id} className={styles.registryCard}>
                  <div className={styles.registryImg}>
                    <img src={item.image_url ?? ''} alt={item.title} />
                  </div>
                  <div className={styles.registryInfo}>
                    <p className="title-sm">{item.subtitle}</p>
                    <h3 className="headline-md" style={{ marginTop: 8 }}>{item.title}</h3>
                    <a
                      href={item.store_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-ghost ${styles.visitBtn}`}
                      style={{ marginTop: 24 }}
                    >
                      Visit {item.store_name}
                    </a>
                  </div>
                </div>
              ))}

              {fundItem && (
                <div className={`${styles.registryCard} ${styles.fundCard}`}>
                  <div className={styles.registryInfo}>
                    <p className="title-sm">{fundItem.subtitle}</p>
                    <h3 className="headline-md" style={{ marginTop: 8 }}>{fundItem.title}</h3>
                    {fundItem.description && (
                      <p className="body-lg" style={{ marginTop: 16 }}>{fundItem.description}</p>
                    )}
                    <a
                      href={fundItem.store_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ marginTop: 24, display: 'inline-flex' }}
                    >
                      <span className="material-icons" aria-hidden="true">flight</span>
                      Contribute to Fund
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
