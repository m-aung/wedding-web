import { Link } from 'react-router-dom'
import styles from './DressCode.module.css'

const attireNotes = [
  {
    title: 'Formal Attire',
    body: 'We kindly invite our guests to dress in formal wedding attire. Think elegant, polished, and celebration-ready.',
  },
  {
    title: 'Color Palette',
    body: 'Soft neutrals, earth tones, muted florals, and classic evening shades are warmly welcomed.',
  },
  {
    title: 'Kind Request',
    body: 'To help the couple stand out on their special day, please avoid wearing white, ivory, or bridal lace looks.',
  },
]

export default function DressCode() {
  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <p className="title-sm">Style Guide</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>
            Dress<br />Code
          </h1>
          <p className="body-lg" style={{ marginTop: 24, maxWidth: 640 }}>
            Your presence matters most, and your elegant attire will make the celebration even more beautiful.
          </p>
        </div>
      </section>

      <section className="section surface-low">
        <div className="container">
          <div className={styles.grid}>
            {attireNotes.map((item) => (
              <article key={item.title} className={styles.card}>
                <p className="title-sm">Wedding Note</p>
                <h2 className="headline-md" style={{ marginTop: 12 }}>{item.title}</h2>
                <p className="body-lg" style={{ marginTop: 16 }}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="title-sm">Next</p>
          <h2 className="headline-lg" style={{ marginTop: 12 }}>
            Questions Before the Day?
          </h2>
          <div style={{ marginTop: 32 }}>
            <Link to="/q-and-a" className="btn-primary">
              View Q&amp;A
              <span className="material-icons" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
