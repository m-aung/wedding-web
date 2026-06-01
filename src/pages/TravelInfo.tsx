import { useTranslation } from 'react-i18next'
import styles from './TravelInfo.module.css'
import LightboxImage from '../components/LightboxImage';

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC-3rBcBWfy9Lx8nTDGVfNcpos6864OogHeB9eOAx3TQXhyTnGfkyJkT8qrvc9cI5cuGrCSEW4NrzJXh10jpPhgJCjepzhs1MLZmWPV88ItpEd2dDH8JQawjEabg5-Eb5c7QUBK7bL655I6PhrgXn-HclV_h_gty5SKCdVPN-1RrzbBnlWjnuAa7LLoVeAZqX2ZpOm2D7axXV_IsNchUdnnyslFoWB7c_ol8St2JeHP0K30plDHYIXKj3NQyaTzHliYTDCnaONnTLo'

const TIP_ICONS = ['train', 'directions_car', 'people']

interface Tip {
  title: string
  body: string
  linkUrl?: string
  linkText?: string
}

export default function TravelRegistry() {
  const { t } = useTranslation()

  const tips = t('travel.tips', { returnObjects: true }) as Tip[]

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
                  {tip.body.split('\n\n').map((para, j) => (
                    <p key={j} className="body-lg" style={{ marginTop: j > 0 ? 12 : 0 }}>{para}</p>
                  ))}
                  {tip.linkUrl && tip.linkText && (
                    <a
                      href={tip.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                      style={{ marginTop: 16 }}
                    >
                      <span className="material-icons" aria-hidden="true">north_east</span>
                      {tip.linkText}
                    </a>
                  )}
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
              <LightboxImage
                src="public\wedding_parking_map.jpeg"
                alt="Parking map placeholder"
              />
              <p className={`body-lg ${styles.parkingCaption}`}>
                {t('travel.parkingCaption')}
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
