import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './OurStory.module.css'

export default function OurStory() {
  const { t } = useTranslation()

  const chapters = [
    {
      id: 'beginning',
      label: t('ourStory.chapterOne.label'),
      place: t('ourStory.chapterOne.date'),
      body: t('ourStory.chapterOne.body'),
      image:
        'https://imagedelivery.net/fdRzTEFWXF8OEw2d6zGmjg/213eefea-bfc3-45e6-8802-86d7a4790000/public',
      imgAlt: 'University campus where Myo and Yoon first met',
      imageRight: false,
    },
    {
      id: 'forever',
      label: t('ourStory.chapterTwo.label'),
      place: t('ourStory.chapterTwo.date'),
      body: t('ourStory.chapterTwo.body'),
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC0MtlRJs6cKmeg-NgvAnbuDqBGRN9xBdffZ_9djVwyM5u-UHVRNKDt8kWbUlrJ8inqeO7C4pNqnEGW8Gsk_zbc6IbuZIJnA8Ds3Bk01OkZHaxJ-rx7a1uL6Kf4oblW3TuieTo5O6NQN7MYAnjkFdjbxf_PLYkEitarNRlLwpSlofkLTA_4RgAF54utRnClLdgZACb8JjfSEVAFHUUAN1bicqEgQFMFev4YY3Ee_4Mou-Jb082uQuzSFrPoO9mC1ACq-SzeKSefoy4',
      imgAlt: 'A moment shared between two people in love',
      imageRight: true,
    },
    {
      id: 'begins',
      label: t('ourStory.chapterThree.label'),
      place: t('ourStory.chapterThree.date'),
      body: t('ourStory.chapterThree.body'),
      image:
        'https://imagedelivery.net/fdRzTEFWXF8OEw2d6zGmjg/90439cc0-f3f3-406a-4bf0-87907cb30700/public',
      imgAlt: 'The beginning of forever',
      imageRight: false,
    },
  ]

  return (
    <div>
      {/* ── Page header ───────────────────────────────────── */}
      <section className={`section surface-low`}>
        <div className="container">
          <p className="title-sm">{t('ourStory.subtitle')}</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>
            {t('ourStory.pageTitle')}
          </h1>
          <p className="body-lg" style={{ marginTop: 24, maxWidth: 600 }}>
            {t('ourStory.intro')}
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
                    {para.trim()}
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
          <p className="title-sm">{t('ourStory.ctaNext')}</p>
          <h2 className="headline-lg" style={{ marginTop: 12 }}>
            {t('ourStory.ctaTitle')}
          </h2>
          <div style={{ marginTop: 32 }}>
            <Link to="/events" className="btn-primary">
              {t('common.viewEvents')}
              <span className="material-icons" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
