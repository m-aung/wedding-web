import { Link } from 'react-router-dom'
import styles from './Events.module.css'
import { WEDDING } from '../constants/couple'

const EVENTS_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBF7rLFfHOiwncN7103azNWkQUqNrPakOpqwmX76LrC41cX2aFfm778WLs_vDgoynr4f99EzRyqweCcUoDLHRZOr1qOcQMcjiNy4KaFmf8zh69GUpG7qnRBSbXg9tBfuzVa9hZdvesTP3Cf2imBG1j_URAOAFaRM7qtZMMNyfa3CJQlb6voWzxl7Px9hsv2yVobIpiOnDNKh02drueV4a_ZWh4Oxh0c0MHe0i_Xu8_uWQagC9QlGmqwjWOIHC16mkVahO3vRq3Tjm8'

interface Event {
  time: string
  title: string
  venue: string
  address: string
  note?: string
  mapsUrl: string
}

const events: Event[] = [
  {
    time: '4:00 PM',
    title: 'The Ceremony',
    venue: 'The Glass House Conservatory',
    address: WEDDING.venueAddress,
    mapsUrl: WEDDING.venueMapsUrl,
  },
  {
    time: '6:00 PM',
    title: 'Cocktail Hour',
    venue: 'The West Lawn Gardens',
    address: WEDDING.venueAddress,
    note: 'Join us for hors d\'oeuvres and signature cocktails immediately following the ceremony.',
    mapsUrl: WEDDING.venueMapsUrl,
  },
  {
    time: '7:00 PM',
    title: 'The Reception',
    venue: 'The Heritage Ballroom',
    address: WEDDING.venueAddress,
    note: 'Dinner and dancing will continue until late. Black tie requested.',
    mapsUrl: WEDDING.venueMapsUrl,
  },
]

export default function Events() {
  return (
    <div>
      {/* ── Page header ───────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroImg}>
          <img src={EVENTS_IMG} alt="Wedding location" />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <p className="title-sm">{WEDDING.dateLong}</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>
            The Wedding<br />Festivities
          </h1>
          <p className="body-lg" style={{ marginTop: 20, maxWidth: 560 }}>
            We invite you to join us for an evening of celebration, starting with
            our exchange of vows followed by dinner and dancing under the stars.
          </p>
        </div>
      </section>

      {/* ── Event timeline ────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className={styles.timeline}>
            {events.map((ev) => (
              <div key={ev.title} className={styles.eventCard}>
                <div className={styles.timeCol}>
                  <span className={styles.time}>{ev.time}</span>
                </div>
                <div className={styles.eventBody}>
                  <p className="title-sm">{ev.title}</p>
                  <h2 className="headline-md" style={{ marginTop: 8 }}>{ev.venue}</h2>
                  <p className="body-lg" style={{ marginTop: 8, color: 'var(--on-surface-variant)' }}>
                    {ev.address}
                  </p>
                  {ev.note && (
                    <p className="body-lg" style={{ marginTop: 12 }}>{ev.note}</p>
                  )}
                  <a
                    href={ev.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-ghost ${styles.mapLink}`}
                    style={{ marginTop: 20 }}
                  >
                    <span className="material-icons" aria-hidden="true">north_east</span>
                    View Map
                  </a>
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
              directions_bus
            </span>
            <div>
              <p className="title-sm">Guest Transportation</p>
              <h2 className="headline-md" style={{ marginTop: 8 }}>Shuttle Service</h2>
              <p className="body-lg" style={{ marginTop: 12 }}>
                Shuttles will depart from The Bedford Post Inn at <strong>3:15 PM</strong> and{' '}
                <strong>3:30 PM</strong> for guests staying on-site.
              </p>
              <div style={{ marginTop: 24 }}>
                <Link to="/travel-registry" className="btn-ghost">
                  More Travel Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
