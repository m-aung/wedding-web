import { useTranslation } from 'react-i18next'
import styles from './QAndA.module.css'

interface Faq {
  question: string
  answer: string
}

export default function QAndA() {
  const { t } = useTranslation()
  const faqs = t('qAndA.faqs', { returnObjects: true }) as Faq[]

  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <p className="title-sm">{t('qAndA.subtitle')}</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>
            {t('qAndA.pageTitle')}
          </h1>
          <p className="body-lg" style={{ marginTop: 24, maxWidth: 640 }}>
            {t('qAndA.intro')}
          </p>
        </div>
      </section>

      <section className="section surface-low">
        <div className="container">
          <div className={styles.list}>
            {faqs.map((item, i) => (
              <article key={i} className={styles.item}>
                <h2 className="headline-md">{item.question}</h2>
                <p className="body-lg" style={{ marginTop: 12 }}>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
