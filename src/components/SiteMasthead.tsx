import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './SiteMasthead.module.css'
import { BRIDE, GROOM, WEDDING } from '../constants/couple'

export default function SiteMasthead() {
  const { t, i18n } = useTranslation()

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/our-story', label: t('nav.ourStory') },
    { to: '/events', label: t('nav.events') },
    { to: '/dress-code', label: t('nav.dressCode') },
    { to: '/q-and-a', label: t('nav.qAndA') },
    { to: '/rsvp', label: t('nav.rsvp') },
    { to: '/travel-registry', label: t('nav.travelRegistry') },
  ]

  const daysToGo = Math.max(
    0,
    Math.ceil((new Date(WEDDING.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  )

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'my' : 'en'
    void i18n.changeLanguage(newLanguage)
  }

  return (
    <section className={styles.wrapper} aria-label="Site masthead">
      <div className="container">
        <div className={styles.content}>
          <div className={styles.toolbar}>
            <button
              type="button"
              onClick={toggleLanguage}
              className={styles.languageToggle}
              aria-label={`Switch to ${i18n.language === 'en' ? 'Burmese' : 'English'}`}
              title={i18n.language === 'en' ? 'မြန်မာ' : 'English'}
            >
              {i18n.language === 'en' ? 'မြန်မာ' : 'EN'}
            </button>
          </div>
          <p className="title-sm">{t('common.unionOf')}</p>
          <h1 className={`display-lg ${styles.title}`}>
            {GROOM.nickname}<span className={styles.amp}>&amp;</span>{BRIDE.nickname}
          </h1>
          <p className={`label-md ${styles.meta}`}>
            {t('common.weddingDate')} &nbsp;•&nbsp; {t('common.venueCity')}, NY
          </p>
          {daysToGo > 0 && (
            <p className={styles.countdown}>
              {t('common.daysToGo', { count: daysToGo })}
            </p>
          )}

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
