import styles from './TravelRegistry.module.css'
import { COUPLE_EMAIL, HOTEL_BOOKING_CODE } from '../constants/couple'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC-3rBcBWfy9Lx8nTDGVfNcpos6864OogHeB9eOAx3TQXhyTnGfkyJkT8qrvc9cI5cuGrCSEW4NrzJXh10jpPhgJCjepzhs1MLZmWPV88ItpEd2dDH8JQawjEabg5-Eb5c7QUBK7bL655I6PhrgXn-HclV_h_gty5SKCdVPN-1RrzbBnlWjnuAa7LLoVeAZqX2ZpOm2D7axXV_IsNchUdnnyslFoWB7c_ol8St2JeHP0K30plDHYIXKj3NQyaTzHliYTDCnaONnTLo'

const HOTEL_1_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAHRWYuisPbeuVDuEsFuL5xmCFrFd6rfdQFIjDeijtG2Og5XRbwgodsxaeSokiIl4PP0dZ0nxFj2c3nH_KugdvdZGEjZMM-SJIzmEi_CgeAUMAoytMBxfGnnN63VPdVhyDNGS2idZYjHa-7GhLmsqzvD6MpDti4NKbIslndkxf5UFrxTQ-QHhvYH0t-JdB47XhwgAZYaIcs4P-Reocixmir45Jjpq0zgs8beeiTUMGV4t8mn0bofDWZW8qn87kxQ1mQLXuHvvavD4g'

const HOTEL_2_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCqqOyUUf__8j4oshblPlD92xEnDu2r7qwLxeXRkcH9CP8CnKsm1P5QOKCtKnVv05Fd67MFpFNiSFQBv7SihhlxMyqHn2zX3NC32Tlzqo4bdwQyLhAQiJ2rQY6wSZhiu3iyfkVYtM3OFCvTd3VnEB7yiwvJ2hlFyMfw2koTPJfqZpsNe4wMCFl-pz7ISxkqXkXtM8KjfVsoFHkPN000wKMoLnxZh6eJico91v-T14oVwrAkfOnKMjDnPx08wcbGjVuWPRTc'

const REGISTRY_ITEMS = [
  {
    title: 'The Kitchen Set',
    subtitle: 'Bespoke Tableware',
    store: 'Williams Sonoma',
    url: 'https://www.williams-sonoma.com/registry/',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzzebFoNBx_oTdE2328zlomqAab5n4e3GyULH2TUIaFGRMU9ELWAZjVO61hgYio7G_lGwgBeSrM8OgloB1iH_XpdTqJVzTxPX7iA9V-gGAzqX1hpnulH6KcsMk77vAv9KWgBWRrVa5h8XXtSfU6FD4o7LTjVIYKNJxqWX-dUbAxPg8yC9_uEY9snRWEtjyi5Rm-9wvZUmx4_6KwYnphdnCquctSKopPvNYbr491IoOKac99isL5rZ5SPgnYWiEkFWNtjerQKGU2d4',
  },
  {
    title: 'Linen & Textures',
    subtitle: 'Italian Cotton Suite',
    store: 'Crate & Barrel',
    url: 'https://www.crateandbarrel.com/gift-registry/',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Os94hejCAg6TJ_MwvuwoUIDsHqDi7OAcQx2KvliUhy9smnsvQdAQb-qAXM69UMTFoC8jCGW28o4BSOi8XLRQusg-vi3UkpwUBIFxVis2uxhlXod4cORlWrMwTE3NUVwcTH53eklQ-MOOTyMcw4TQuWEnCZXG2xfvdAnxkzJOelI6AJaa2VYVETtzp5knFKMhJ_7XtNJKqrIJNmaw8QjS8t3Dy05vtgxgzXlfeiKvCeNk8iAH1e3WHCxmJFdyoCUL0iUiBzhjQQw',
  },
  {
    title: 'Home Gallery',
    subtitle: 'Art & Glassware',
    store: 'Zola',
    url: 'https://www.zola.com/registry/',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiwxnM03kDo2W48rEEj9qv8okUc2aweuiNfPu18SU4y73sKVpZJDymZS4c6AwyZ-4O7vfEXkI5sDI3p5eYDc6j_DyXgV0iQXkbIOc88EcKQiS0rv8fnFd7VHNT92ZVmEZuENAUKiWWsjz-lx6q2180QkMxnkNV9q4yynTiABDh-ibzZOKUeCLwgAhCfs6kxBZxh5GH9aDSs28jcMhfH4VPCshrJJxK7TkOZJE1MJLSL8rbPH_ViaBdVuMrnCf3XR6nu8NFD49O4',
  },
]

const TRAVEL_TIPS = [
  {
    icon: 'flight',
    title: 'Air Travel',
    body: 'The closest international airport is Portsmith (PHX), approximately 45 minutes from the venue.',
  },
  {
    icon: 'directions_car',
    title: 'Transport',
    body: 'We recommend using ride-share apps or renting a car for flexibility during the weekend.',
  },
  {
    icon: 'cloud',
    title: 'Weather',
    body: 'Expect crisp autumn weather. Evenings can be cool, ranging from 55°F to 65°F.',
  },
  {
    icon: 'info',
    title: 'Assistance',
    body: `For any travel-related questions, please contact our coordinator at ${COUPLE_EMAIL}.`,
  },
]

export default function TravelRegistry() {
  return (
    <div>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroImg}>
          <img src={HERO_IMG} alt="Travel and accommodations" />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <p className="title-sm">Travel &amp; Accommodations</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>
            Stay With Us
          </h1>
        </div>
      </section>

      {/* ── Accommodations ─────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <p className="title-sm">Where to Stay</p>
          <p className="body-lg" style={{ marginTop: 8, maxWidth: 640 }}>
            We have curated a selection of beautiful stays near our venue. To ensure your
            comfort, we have secured limited room blocks at our favourite local haunts.
          </p>

          <div className={styles.hotels}>
            {/* Heritage House */}
            <div className={styles.hotelCard}>
              <div className={styles.hotelImg}>
                <img src={HOTEL_1_IMG} alt="The Heritage House hotel exterior" />
              </div>
              <div className={styles.hotelInfo}>
                <p className="title-sm">Est. 1894</p>
                <h2 className="headline-md" style={{ marginTop: 8 }}>The Heritage House</h2>
                <p className="body-lg" style={{ marginTop: 12 }}>
                  Located in the heart of the historic district, just a five-minute stroll from
                  the ceremony venue. A blend of classic charm and modern luxury.
                </p>
                <div className={styles.hotelMeta}>
                  <div>
                    <p className="label-md">Booking Code</p>
                    <p className="body-lg" style={{ marginTop: 4 }}>{HOTEL_BOOKING_CODE}</p>
                  </div>
                  <div>
                    <p className="label-md">Cut-off Date</p>
                    <p className="body-lg" style={{ marginTop: 4 }}>August 15, 2024</p>
                  </div>
                </div>
                <a
                  href="https://www.marriott.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ marginTop: 24, display: 'inline-flex' }}
                >
                  Book This Stay
                  <span className="material-icons" aria-hidden="true">arrow_right_alt</span>
                </a>
              </div>
            </div>

            {/* Vellum Suites */}
            <div className={styles.hotelCard}>
              <div className={styles.hotelImg}>
                <img src={HOTEL_2_IMG} alt="Vellum Suites exterior" />
              </div>
              <div className={styles.hotelInfo}>
                <p className="title-sm">Modern Minimal</p>
                <h2 className="headline-md" style={{ marginTop: 8 }}>Vellum Suites</h2>
                <p className="body-lg" style={{ marginTop: 12 }}>
                  For those seeking a contemporary retreat. Vellum offers minimalist interiors
                  and panoramic views of the valley.
                </p>
                <div className={styles.hotelMeta}>
                  <div>
                    <p className="label-md">Booking</p>
                    <p className="body-lg" style={{ marginTop: 4 }}>Click to Access</p>
                  </div>
                  <div>
                    <p className="label-md">Shuttle Service</p>
                    <p className="body-lg" style={{ marginTop: 4 }}>Available</p>
                  </div>
                </div>
                <a
                  href="https://www.hilton.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ marginTop: 24, display: 'inline-flex' }}
                >
                  Explore Availability
                  <span className="material-icons" aria-hidden="true">arrow_right_alt</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Travel tips ────────────────────────────────────── */}
      <section className="section surface-low">
        <div className="container">
          <p className="title-sm">Getting Here</p>
          <h2 className="headline-lg" style={{ marginTop: 12, marginBottom: 48 }}>
            Travel Information
          </h2>
          <div className={styles.tips}>
            {TRAVEL_TIPS.map((tip) => (
              <div key={tip.title} className={styles.tip}>
                <span className="material-icons" style={{ color: 'var(--secondary)', fontSize: 24 }} aria-hidden="true">
                  {tip.icon}
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

      {/* ── Registry ───────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <p className="title-sm">Registry</p>
          <h2 className="headline-lg" style={{ marginTop: 12 }}>A Curated Collection</h2>
          <p className="body-lg" style={{ marginTop: 16, maxWidth: 600 }}>
            Your presence is the greatest gift of all. If you wish to honor us with a gift,
            we have selected pieces that will help us build our home and future together.
          </p>

          <div className={styles.registry}>
            {REGISTRY_ITEMS.map((item) => (
              <div key={item.title} className={styles.registryCard}>
                <div className={styles.registryImg}>
                  <img src={item.img} alt={item.title} />
                </div>
                <div className={styles.registryInfo}>
                  <p className="title-sm">{item.subtitle}</p>
                  <h3 className="headline-md" style={{ marginTop: 8 }}>{item.title}</h3>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-ghost ${styles.visitBtn}`}
                    style={{ marginTop: 24 }}
                  >
                    Visit {item.store}
                  </a>
                </div>
              </div>
            ))}

            {/* Honeymoon Fund */}
            <div className={`${styles.registryCard} ${styles.fundCard}`}>
              <div className={styles.registryInfo}>
                <p className="title-sm">Experiential</p>
                <h3 className="headline-md" style={{ marginTop: 8 }}>Honeymoon Fund</h3>
                <p className="body-lg" style={{ marginTop: 16 }}>
                  If you&apos;d prefer to contribute to our first journey as a married couple,
                  we have created a fund for our adventures in the Amalfi Coast.
                </p>
                <a
                  href="https://www.zola.com/registry/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ marginTop: 24, display: 'inline-flex' }}
                >
                  <span className="material-icons" aria-hidden="true">flight</span>
                  Contribute to Fund
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
