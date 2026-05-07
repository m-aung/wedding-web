import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './TravelRegistry.module.css'
import { supabase } from '../lib/supabase'
import type { RegistryItemRow } from '../lib/database.types'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC-3rBcBWfy9Lx8nTDGVfNcpos6864OogHeB9eOAx3TQXhyTnGfkyJkT8qrvc9cI5cuGrCSEW4NrzJXh10jpPhgJCjepzhs1MLZmWPV88ItpEd2dDH8JQawjEabg5-Eb5c7QUBK7bL655I6PhrgXn-HclV_h_gty5SKCdVPN-1RrzbBnlWjnuAa7LLoVeAZqX2ZpOm2D7axXV_IsNchUdnnyslFoWB7c_ol8St2JeHP0K30plDHYIXKj3NQyaTzHliYTDCnaONnTLo'

const TIP_ICONS = ['train', 'directions_car', 'people']

interface Tip {
  title: string
  body: string
}

export default function TravelRegistry() {
  const { t } = useTranslation()
  const [registryItems, setRegistryItems] = useState<RegistryItemRow[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const tips = t('travel.tips', { returnObjects: true }) as Tip[]

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
          <p className="title-sm">{t('travel.subtitle')}</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>{t('travel.pageTitle')}</h1>
        </div>
      </section>

      {/* ── Travel Tips ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <p className="title-sm">{t('travel.travelGuide')}</p>
          <h2 className="headline-lg" style={{ marginTop: 12, marginBottom: 48 }}>
            {t('travel.venueGuide')}
          </h2>
          <div className={styles.tips}>
            {tips.map((tip, i) => (
              <div key={i} className={styles.tip}>
                <span
                  className="material-icons"
                  style={{ color: 'var(--secondary)', fontSize: 24 }}
                  aria-hidden="true"
                >
                  {TIP_ICONS[i]}
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

      {/* ── Parking & Directions ───────────────────────────── */}
      <section className="section surface-low">
        <div className="container">
          <p className="title-sm">{t('travel.parkingLabel')}</p>
          <h2 className="headline-lg" style={{ marginTop: 12, marginBottom: 48 }}>
            {t('travel.parkingTitle')}
          </h2>
          <div className={styles.parkingGrid}>
            <div className={styles.parkingMap}>
              <iframe
                title="Venue location"
                src={`https://www.google.com/maps?q=${encodeURIComponent('9 Fire Place Neck Road, Brookhaven, NY 11719')}&output=embed&z=15`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className={styles.parkingImg}>
              <img
                src="https://placehold.co/800x500/e8e0db/8d7c6e?text=Parking+Map+(placeholder)"
                alt="Parking map placeholder"
              />
              <p className={`body-lg ${styles.parkingCaption}`}>
                {t('travel.parkingCaption')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Registry ───────────────────────────────────────── */}
      {!loadingData && !fetchError && registryItems.length > 0 && (
        <section className="section surface-low">
          <div className="container">
            <p className="title-sm">{t('travel.registry')}</p>
            <h2 className="headline-lg" style={{ marginTop: 12 }}>{t('travel.registryTitle')}</h2>
            <p className="body-lg" style={{ marginTop: 16, maxWidth: 600 }}>
              {t('travel.registryIntro')}
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
                      {t('travel.contributeFund')}
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
