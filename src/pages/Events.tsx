import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Events.module.css'
import { WEDDING } from '../constants/couple'

const EVENTS_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBF7rLFfHOiwncN7103azNWkQUqNrPakOpqwmX76LrC41cX2aFfm778WLs_vDgoynr4f99EzRyqweCcUoDLHRZOr1qOcQMcjiNy4KaFmf8zh69GUpG7qnRBSbXg9tBfuzVa9hZdvesTP3Cf2imBG1j_URAOAFaRM7qtZMMNyfa3CJQlb6voWzxl7Px9hsv2yVobIpiOnDNKh02drueV4a_ZWh4Oxh0c0MHe0i_Xu8_uWQagC9QlGmqwjWOIHC16mkVahO3vRq3Tjm8'

interface Event {
  time: string
  title: string
  detail: string
  note?: string
}

export default function Events() {
  const { t } = useTranslation()

  const events: Event[] = [
    {
      time: t('events.ceremony.time'),
      title: t('events.ceremony.title'),
      detail: t('events.ceremony.detail'),
    },
    {
      time: t('events.cocktail.time'),
      title: t('events.cocktail.title'),
      detail: t('events.cocktail.detail'),
      note: t('events.cocktail.note'),
    },
    {
      time: t('events.reception.time'),
      title: t('events.reception.title'),
      detail: t('events.reception.detail'),
      note: t('events.reception.note'),
    },
  ]

  return (
    <div>
      {/* ── Page header ───────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroImg}>
          <img src={EVENTS_IMG} alt="Wedding location" />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <p className="title-sm">{t('common.weddingDate')}</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>
            {t('events.pageTitle')}
          </h1>
          <p className="body-lg" style={{ marginTop: 20, maxWidth: 560 }}>
            {t('events.intro')}
          </p>
        </div>
      </section>

      {/* ── Event timeline ────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <p className="title-sm">{t('events.venueSection')}</p>
            <h2 className="headline-md" style={{ marginTop: 8 }}>{WEDDING.venueName}</h2>
            <p className="body-lg" style={{ marginTop: 8, color: 'var(--on-surface-variant)' }}>
              {t('events.venueDescription')} {t('common.venueAddress')}
            </p>
            <a
              href={WEDDING.venueMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-ghost ${styles.mapLink}`}
              style={{ marginTop: 16 }}
            >
              <span className="material-icons" aria-hidden="true">north_east</span>
              {t('common.openVenueMap')}
            </a>
          </div>

          <div className={styles.timeline}>
            {events.map((ev) => (
              <div key={ev.title} className={styles.eventCard}>
                <div className={styles.timeCol}>
                  <span className={styles.time}>{ev.time}</span>
                </div>
                <div className={styles.eventBody}>
                  <p className="title-sm">{ev.title}</p>
                  <p className="body-lg" style={{ marginTop: 10 }}>{ev.detail}</p>
                  {ev.note && (
                    <p className="body-lg" style={{ marginTop: 12, color: 'var(--on-surface-variant)' }}>
                      {ev.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transport ─────────────────────────────────────── */}
      <section className="section surface-low">
        <div className="container">
          <div className={styles.transport}>
            <span className="material-icons" style={{ color: 'var(--secondary)', fontSize: 28 }} aria-hidden="true">
              train
            </span>
            <div>
              <p className="title-sm">{t('events.transport')}</p>
              <h2 className="headline-md" style={{ marginTop: 8 }}>{t('events.transportTitle')}</h2>
              <p className="body-lg" style={{ marginTop: 12 }}>
                {t('events.transportDetail')}
              </p>
              <div style={{ marginTop: 24 }}>
                <Link to="/travel-registry" className="btn-ghost">
                  {t('events.moreTravel')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
