import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Home.module.css'
import { BRIDE, GROOM, WEDDING } from '../constants/couple'

export default function Home() {
  const { t } = useTranslation()

  const quickLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/our-story', label: t('nav.ourStory') },
    { to: '/events', label: t('nav.events') },
    { to: '/dress-code', label: t('nav.dressCode') },
    { to: '/q-and-a', label: t('nav.qAndA') },
    { to: '/rsvp', label: t('nav.rsvp') },
    { to: '/travel-registry', label: t('nav.travelRegistry') },
  ]

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <img src={'public/couple-hero-main.jpg'} alt={`${GROOM.nickname} and ${BRIDE.nickname}`} />
        </div>
        <div className={styles.mobileLaceBlock} aria-hidden="true" />
      </section>

      <section className={styles.mobileHomeNavSection}>
        <div className={`container ${styles.mobileHomeNavInner}`}>
          <div className={styles.mobileRsvpWrap}>
            <Link to="/rsvp" className="btn-primary">RSVP</Link>
          </div>

          <div className={styles.mobileWeddingDay}>
            <p className={styles.mobileWeddingLabel}>{t('home.weddingDay')}</p>
            <p className={styles.mobileWeddingDate}>{t('common.weddingDate')}</p>
          </div>

          <nav className={styles.mobileQuickNav} aria-label="Quick page access">
            {quickLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`${styles.mobileQuickLink} ${to === '/' ? styles.mobileQuickLinkActive : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className={styles.desktopSessionSection}>
        <div className="container">
          <div className={styles.desktopInfoGrid}>
            <div className={styles.desktopInfoCard}>
              <p className={styles.desktopInfoValue}>
                {t('home.dateMonth')}
                <br />
                {t('home.dateDayYear')}
              </p>
            </div>
            <div className={styles.desktopInfoCard}>
              <p className={styles.desktopInfoValue}>
                {WEDDING.venueCity}
                <br />
                NY
              </p>
            </div>
          </div>

          <div className={styles.desktopRsvpWrap}>
            <Link to="/rsvp" className="btn-primary">RSVP</Link>
          </div>

          <div className={styles.desktopWeddingDay}>
            <p className={styles.desktopWeddingLabel}>{t('home.weddingDay')}</p>
            <p className={styles.desktopWeddingDate}>{t('common.weddingDate')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
