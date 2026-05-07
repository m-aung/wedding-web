import { useState, useEffect } from 'react'
import styles from './TravelRegistry.module.css'
import { supabase } from '../lib/supabase'
import type { RegistryItemRow } from '../lib/database.types'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC-3rBcBWfy9Lx8nTDGVfNcpos6864OogHeB9eOAx3TQXhyTnGfkyJkT8qrvc9cI5cuGrCSEW4NrzJXh10jpPhgJCjepzhs1MLZmWPV88ItpEd2dDH8JQawjEabg5-Eb5c7QUBK7bL655I6PhrgXn-HclV_h_gty5SKCdVPN-1RrzbBnlWjnuAa7LLoVeAZqX2ZpOm2D7axXV_IsNchUdnnyslFoWB7c_ol8St2JeHP0K30plDHYIXKj3NQyaTzHliYTDCnaONnTLo'

const TRAVEL_TIPS = [
  {
    icon: 'train',
    title: 'LIRR & Rideshare',
    body: 'The nearest LIRR station is located a short distance from the venue. Guests may take an Uber or Lyft from the station for convenience.',
  },
  {
    icon: 'directions_car',
    title: 'Parking',
    body: 'Due to limited parking at the venue, rideshare is highly encouraged. If you choose to drive, please arrive early and allow extra time for parking. If the parking area is full, kindly use nearby street parking and do not park on the grass.',
  },
  {
    icon: 'people',
    title: 'Carpool',
    body: 'If you have any difficulty taking the LIRR, feel free to let us know—we will try to assist with coordinating a carpool if possible.',
  },
]


export default function TravelRegistry() {
  const [registryItems, setRegistryItems] = useState<RegistryItemRow[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRegistry() {
      const { data, error } = await supabase
        .from('registry_items')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order')
      if (error) {
        setFetchError('Could not load registry. Please refresh.')
      } else {
        setRegistryItems(data)
      }
      setLoadingData(false)
    }
    fetchRegistry()
  }, [])

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
          <p className="title-sm">Getting Here</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>Travel Information</h1>
        </div>
      </section>

      {/* ── Travel Tips ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <p className="title-sm">How to Arrive</p>
          <h2 className="headline-lg" style={{ marginTop: 12, marginBottom: 48 }}>
            Getting to the Venue
          </h2>
          <div className={styles.tips}>
            {TRAVEL_TIPS.map((tip) => (
              <div key={tip.title} className={styles.tip}>
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
        </div>
      </section>

      {/* ── Registry ───────────────────────────────────────── */}
      {!loadingData && !fetchError && registryItems.length > 0 && (
        <section className="section surface-low">
          <div className="container">
            <p className="title-sm">Registry</p>
            <h2 className="headline-lg" style={{ marginTop: 12 }}>A Curated Collection</h2>
            <p className="body-lg" style={{ marginTop: 16, maxWidth: 600 }}>
              Your presence is the greatest gift of all. If you wish to honor us with a gift,
              we have selected pieces that will help us build our home and future together.
            </p>

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
          </div>
        </section>
      )}
    </div>
  )
}
