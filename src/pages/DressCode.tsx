import { Link } from 'react-router-dom'
import styles from './DressCode.module.css'

type AttireNote = {
  title: string,
  body: string,
}
function generateAttireNotes(title:string, body:string):AttireNote { 
  return {
     title,
    body,
  }
}

const attireNotes: AttireNote[] = [
  generateAttireNotes('Dressy Elegance', 'Guests are encouraged to wear polished outfits - suits or blazers with dress pants for men (no tie, please), and either long or short dresses for women. \n Please avoid overly casual outfits such as jeans or sneakers, as we want everyone to feel special and celebration-ready. We can\'t wait to see your stylish looks!'),
  generateAttireNotes('Outdoor Setting', 'Since our wedding will be held outdoors on grass, we recommend wearing comfortable shoes suitable for walking on grass. Please also bring a light layer for the evening, as it may get cooler. We can\'t wait to celebrate with you in our beautiful outdoor setting!'),
  generateAttireNotes('Color Palette', 'Our color palette is soft and timeless, featuring neutral tones, soft pastels and muted colors. We encourage guests to choose outfits in these shades to complement the overall aesthetic of our wedding. Please avoid wearing all white, white with black pants, and peach or salmon tones, as these colors are reserved for the wedding party. We can\'t wait to see your elegant and stylish outfits that will perfectly complement our wedding theme!'),
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
