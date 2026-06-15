import { useTranslation } from 'react-i18next'
import styles from './Registry.module.css'

export default function Registry() {
  const { t } = useTranslation()

  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <p className="title-sm">{t('registry.subtitle')}</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>
            {t('registry.pageTitle')}
          </h1>
        </div>
      </section>

      <section className="section surface-low">
        <div className="container">
          <div className={styles.card}>
            <span className={`material-icons ${styles.icon}`} aria-hidden="true">
              card_giftcard
            </span>
            <p className="body-lg">{t('registry.message')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
