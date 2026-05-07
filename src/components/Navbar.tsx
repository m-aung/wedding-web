import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Navbar.module.css'
import { BRIDE, COUPLE_DISPLAY, GROOM } from '../constants/couple'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const monogram = `${GROOM.nickname.charAt(0)}&${BRIDE.nickname.charAt(0)}`

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/our-story', label: t('nav.ourStory') },
    { to: '/events', label: t('nav.events') },
    { to: '/dress-code', label: t('nav.dressCode') },
    { to: '/q-and-a', label: t('nav.qAndA') },
    { to: '/rsvp', label: t('nav.rsvp') },
    { to: '/travel-registry', label: t('nav.travelRegistry') },
  ]

  const close = () => setOpen(false)

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'my' : 'en'
    i18n.changeLanguage(newLanguage)
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.logo} onClick={close}>
          <span className={styles.logoFull}>{COUPLE_DISPLAY}</span>
          <span className={styles.logoMonogram}>{monogram}</span>
        </NavLink>

        {/* Language switcher */}
        <button
          onClick={toggleLanguage}
          className={styles.languageToggle}
          aria-label={`Switch to ${i18n.language === 'en' ? 'Burmese' : 'English'}`}
          title={`${i18n.language === 'en' ? 'မြန်မာ' : 'English'}`}
        >
          {i18n.language === 'en' ? 'မြန်မာ' : 'EN'}
        </button>

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
