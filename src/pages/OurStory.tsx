import { Link } from 'react-router-dom'
import styles from './OurStory.module.css'

const chapters = [
  {
    id: 'beginning',
    label: 'Chapter One — Where It All Began',
    place: '2007–2012',
    body: `Before there was love, there was friendship.

We met at the same university in 2007, sharing classrooms, laughter, and the simple joy of growing up side by side. Those years—from 2008 to 2012—were filled with unforgettable moments, where friendship quietly became the foundation of something more.

We didn't know it then, but we were already writing the first pages of our story.`,
    image:
      'https://imagedelivery.net/fdRzTEFWXF8OEw2d6zGmjg/213eefea-bfc3-45e6-8802-86d7a4790000/public',
    imgAlt: 'University campus where Myo and Yoon first met',
    imageRight: false,
  },
  {
    id: 'forever',
    label: 'Chapter Two — From Us to Forever',
    place: '2012–2025',
    body: `What started as friendship slowly turned into something deeper.

Through the years, life changed—but one thing didn't: us. We grew, supported each other, and built a bond that only became stronger with time.

And in 2025, everything led to one unforgettable moment—a question, a pause, and a "yes" that meant forever.`,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0MtlRJs6cKmeg-NgvAnbuDqBGRN9xBdffZ_9djVwyM5u-UHVRNKDt8kWbUlrJ8inqeO7C4pNqnEGW8Gsk_zbc6IbuZIJnA8Ds3Bk01OkZHaxJ-rx7a1uL6Kf4oblW3TuieTo5O6NQN7MYAnjkFdjbxf_PLYkEitarNRlLwpSlofkLTA_4RgAF54utRnClLdgZACb8JjfSEVAFHUUAN1bicqEgQFMFev4YY3Ee_4Mou-Jb082uQuzSFrPoO9mC1ACq-SzeKSefoy4',
    imgAlt: 'A moment shared between two people in love',
    imageRight: true,
  },
  {
    id: 'begins',
    label: 'Chapter Three — Forever Begins',
    place: '2026',
    body: `Now, we begin our next chapter.

From friendship… to love… to a lifetime together.

In 2026, we say "I do"—and start the most beautiful part of our story yet.`,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCoyzohjKnJuBe6GyjkkVD96aGPgDS0qVcBTx5FjmJqYi-L1i1lkQsLLGFSRhWj9QoNDSne0Qzlk1kSulbanRKK8PDRFOvddPiZPbBcnwAN3t6dkXMdApfpAB_KTf3zI5Y7mfcrfzZoKt26SM8BjNY0_tyqdLVloQVDK0tMW0X6BkGNS0izEnlBVG-piJAw-sGl5LY21DRGasF-bDTXhp8XTwTJQ_1gBy0W7IdN4-V_Acfq5PLe9Y9xVNvIyUA7zbYZ9XaMkL9-9mc',
    imgAlt: 'The beginning of forever',
    imageRight: false,
  },
]

export default function OurStory() {
  return (
    <div>
      {/* ── Page header ───────────────────────────────────── */}
      <section className={`section surface-low`}>
        <div className="container">
          <p className="title-sm">Nearly two decades in the making</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>
            Our<br />Story
          </h1>
          <p className="body-lg" style={{ marginTop: 24, maxWidth: 600 }}>
            From university friends to lifelong partners—a love story that began in 2007 and never stopped growing.
          </p>
        </div>
      </section>

      {/* ── Chapters ──────────────────────────────────────── */}
      {chapters.map((ch) => (
        <section
          key={ch.id}
          className={`section ${styles.chapter} ${ch.imageRight ? styles.imageRight : ''}`}
        >
          <div className="container">
            <div className={styles.grid}>
              <div className={styles.imageWrap}>
                <img src={ch.image} alt={ch.imgAlt} />
              </div>
              <div className={styles.text}>
                <p className="title-sm">{ch.label}</p>
                <h2 className="headline-lg" style={{ marginTop: 12 }}>{ch.place}</h2>
                {ch.body.split('\n\n').map((para, i) => (
                  <p className="body-lg" key={i} style={{ marginTop: 20 }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className={`section surface-low`} style={{ textAlign: 'center' }}>
        <div className="container">
          <p className="title-sm">Next</p>
          <h2 className="headline-lg" style={{ marginTop: 12 }}>
            The Celebration Details
          </h2>
          <div style={{ marginTop: 32 }}>
            <Link to="/events" className="btn-primary">
              View Events
              <span className="material-icons" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
