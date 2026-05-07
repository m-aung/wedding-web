import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './DressCode.module.css'
import ColorPalette from '../components/ColorPalette'
import DressGallery from '../components/DressGallery'

export default function DressCode() {
  const { t } = useTranslation()

  const attireNotes = [
    { key: 'dressy', title: t('dressCode.dressy.title'), body: t('dressCode.dressy.body') },
    { key: 'outdoor', title: t('dressCode.outdoor.title'), body: t('dressCode.outdoor.body') },
    { key: 'colors', title: t('dressCode.colors.title'), body: t('dressCode.colors.body') },
  ]

  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <p className="title-sm">{t('dressCode.subtitle')}</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>
            {t('dressCode.pageTitle')}
          </h1>
          <p className="body-lg" style={{ marginTop: 24, maxWidth: 640 }}>
            {t('dressCode.intro')}
          </p>
        </div>
      </section>

      <section className="section surface-low">
        <div className="container">
          <div className={styles.grid}>
            {attireNotes.map((item) => (
              <article key={item.key} className={styles.card}>
                <p className="title-sm">{t('dressCode.weddingNote')}</p>
                <h2 className="headline-md" style={{ marginTop: 12 }}>{item.title}</h2>
                <p className="body-lg" style={{ marginTop: 16 }}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="title-sm">{t('dressCode.gallerySection')}</p>
          <h2 className="headline-lg" style={{ marginTop: 12 }}>
            {t('dressCode.galleryHeading')}
          </h2>
        </div>
        <DressGallery />
      </section>

      <section className="section surface-low">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="title-sm">{t('dressCode.paletteSection')}</p>
          <h2 className="headline-lg" style={{ marginTop: 12, marginBottom: 48 }}>
            {t('dressCode.paletteHeading')}
          </h2>
          <ColorPalette />
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="title-sm">{t('dressCode.ctaNext')}</p>
          <h2 className="headline-lg" style={{ marginTop: 12 }}>
            {t('dressCode.ctaTitle')}
          </h2>
          <div style={{ marginTop: 32 }}>
            <Link to="/q-and-a" className="btn-primary">
              {t('common.viewQAndA')}
              <span className="material-icons" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
