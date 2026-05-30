import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './DressCode.module.css'

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
                {item.body.split('\n\n').map((para, i) => (
                  <p key={i} className="body-lg" style={{ marginTop: i === 0 ? 16 : 12 }}>{para}</p>
                ))}
              </article>
            ))}
          </div>
          <div className={styles.paletteImage}>
            <img className={styles.paletteDesktop} src="/color-palette.png" alt="Wedding colour palette" />
            <div className={styles.paletteMobile}>
              <img src="/for-women-palette.jpeg" alt="Colour palette for women" />
              <img src="/for-men-palette.jpeg" alt="Colour palette for men" />
            </div>
          </div>
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
