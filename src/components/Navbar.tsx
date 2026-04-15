import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import { BRIDE, COUPLE_DISPLAY, GROOM } from '../constants/couple'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/events', label: 'Events' },
  { to: '/dress-code', label: 'Dress Code' },
  { to: '/q-and-a', label: 'Q&A' },
  { to: '/rsvp', label: 'RSVP' },
  { to: '/travel-registry', label: 'Travel & Registry' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const monogram = `${GROOM.nickname.charAt(0)}&${BRIDE.nickname.charAt(0)}`

  const close = () => setOpen(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.logo} onClick={close}>
          <span className={styles.logoFull}>{COUPLE_DISPLAY}</span>
          <span className={styles.logoMonogram}>{monogram}</span>
        </NavLink>



        {/* Hamburger button (mobile only) */}
        <button
          className={styles.hamburger}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`${styles.bar} ${open ? styles.barTopOpen : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barMidOpen : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barBotOpen : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav aria-label="Mobile navigation" className={styles.mobileNav}>
          <ul className={styles.mobileList}>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `${styles.mobileLink} ${isActive ? styles.active : ''}`
                  }
                  onClick={close}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
