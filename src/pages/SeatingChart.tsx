import { useTranslation } from 'react-i18next'
import styles from './SeatingChart.module.css'

interface TableInfo {
  number: number
  name: string
  guests: string[]
}

export default function SeatingChart() {
  const { t } = useTranslation()
  const tables = t('seatingChart.tables', { returnObjects: true }) as TableInfo[]

  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <p className="title-sm">{t('seatingChart.subtitle')}</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>
            {t('seatingChart.pageTitle')}
          </h1>
          <p className="body-lg" style={{ marginTop: 24, maxWidth: 640 }}>
            {t('seatingChart.intro')}
          </p>
        </div>
      </section>

      <section className="section surface-low">
        <div className="container">
          <div className={styles.grid}>
            {tables.map((table) => (
              <article key={table.number} className={styles.card}>
                <p className="title-sm">
                  {t('seatingChart.tableLabel')} {table.number}
                </p>
                <h2 className="headline-md" style={{ marginTop: 12 }}>{table.name}</h2>
                <ul className={styles.guestList}>
                  {table.guests.map((guest) => (
                    <li key={guest} className="body-lg">{guest}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
