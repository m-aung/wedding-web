import { NavLink } from 'react-router-dom'
import styles from './SiteMasthead.module.css'
import { BRIDE, GROOM, WEDDING } from '../constants/couple'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/events', label: 'Events' },
  { to: '/dress-code', label: 'Dress Code' },
  { to: '/q-and-a', label: 'Q&A' },
  { to: '/rsvp', label: 'RSVP' },
  { to: '/travel-registry', label: 'Travel & Registry' },
]

export default function SiteMasthead() {
  const daysToGo = Math.max(
    0,
    Math.ceil((new Date(WEDDING.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  )

  return (
    <section className={styles.wrapper} aria-label="Site masthead">
      <div className="container">
        <div className={styles.content}>
          <p className="title-sm">The Union of</p>
          <h1 className={`display-lg ${styles.title}`}>
            {GROOM.nickname}<span className={styles.amp}>&amp;</span>{BRIDE.nickname}
          </h1>
          <p className={`label-md ${styles.meta}`}>
            {WEDDING.dateLong} &nbsp;•&nbsp; {WEDDING.venueCity}, NY
          </p>
          {daysToGo > 0 && <p className={styles.countdown}>{daysToGo} days to go!</p>}

          <nav className={styles.nav} aria-label="Desktop page access">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}
