import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import { BRIDE, GROOM, WEDDING } from '../constants/couple'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAuMMFuu9iMWTFN-ashGyfsf9tpi8_BUzv6JoyeBdbvEFviz2Va67nEoTxNHI2pFQKplFyTljRzvaWHxEYxw4I0Xa4U_B41qEOZ0g4hb53cRvuJHwVO6cs-ugHFY1drCklXUFAPWCBinU6DWesSaS8dth0xghh9wIbjrdqrOMIEW7Lg_g37ktk_DYfiWjMoybsgCWcDl8D1XrxL1tSHYiyj4aFO_FuhZExt3JeLApZrk2nOlOMDoAzn4-DxYLTqRG7U0I-C-ZJDRns'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/events', label: 'Events' },
  { to: '/dress-code', label: 'Dress Code' },
  { to: '/q-and-a', label: 'Q&A' },
  { to: '/rsvp', label: 'RSVP' },
  { to: '/travel-registry', label: 'Travel & Registry' },
]

export default function Home() {
  const [month = 'September', day = '19', year = '2026'] = WEDDING.date.replace(',', '').split(' ')

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <img src={HERO_IMG} alt={`${GROOM.nickname} and ${BRIDE.nickname}`} />
        </div>
        <div className={styles.mobileLaceBlock} aria-hidden="true" />
      </section>

      <section className={styles.mobileHomeNavSection}>
        <div className={`container ${styles.mobileHomeNavInner}`}>
          <div className={styles.mobileRsvpWrap}>
            <Link to="/rsvp" className="btn-primary">RSVP</Link>
          </div>

          <div className={styles.mobileWeddingDay}>
            <p className={styles.mobileWeddingLabel}>Wedding Day</p>
            <p className={styles.mobileWeddingDate}>{WEDDING.dateLong}</p>
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
                {month}
                <br />
                {day}, {year}
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
            <p className={styles.desktopWeddingLabel}>Wedding Day</p>
            <p className={styles.desktopWeddingDate}>{WEDDING.dateLong}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
