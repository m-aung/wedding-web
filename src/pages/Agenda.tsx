import { useTranslation } from 'react-i18next'
import styles from './Agenda.module.css'

interface AgendaItem {
  time: string
  title: string
  detail: string
  location?: string
  icon: string
}

export default function Agenda() {
  const { t } = useTranslation()
  const items = t('agenda.items', { returnObjects: true }) as AgendaItem[]

  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <p className="title-sm">{t('agenda.subtitle')}</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>
            {t('agenda.pageTitle')}
          </h1>
          <p className="body-lg" style={{ marginTop: 24, maxWidth: 640 }}>
            {t('agenda.intro')}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.timeline}>
            {items.map((item, i) => (
              <div key={i} className={styles.itemCard}>
                <div className={styles.timeCol}>
                  <span className={`material-icons ${styles.itemIcon}`} aria-hidden="true">{item.icon}</span>
                  <span className={styles.time}>{item.time}</span>
                </div>
                <div className={styles.itemBody}>
                  <p className="title-sm">{item.title}</p>
                  <p className="body-lg" style={{ marginTop: 10 }}>{item.detail}</p>
                  {item.location && (
                    <div className={styles.itemLocation}>
                      <span className="material-icons" aria-hidden="true">place</span>
                      <span className="body-lg">{item.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
