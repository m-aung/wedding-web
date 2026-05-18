import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './QAndA.module.css'

interface Faq {
  question: string
  answer: string
}

export default function QAndA() {
  const { t } = useTranslation()
  const faqs = t('qAndA.faqs', { returnObjects: true }) as Faq[]
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? faqs.filter(
        item =>
          item.question.toLowerCase().includes(query.toLowerCase()) ||
          item.answer.toLowerCase().includes(query.toLowerCase()),
      )
    : faqs

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
          <div className={styles.searchWrapper}>
            <span className={`material-icons ${styles.searchIcon}`}>search</span>
            <input
              className={`input-field ${styles.searchInput}`}
              type="search"
              placeholder={t('qAndA.searchPlaceholder')}
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          {filtered.length > 0 ? (
            <div className={styles.list}>
              {filtered.map((item, i) => (
                <article key={i} className={styles.item}>
                  <h2 className="headline-md">{item.question}</h2>
                  <p className="body-lg" style={{ marginTop: 12 }}>{item.answer}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className={`body-lg ${styles.noResults}`}>
              {t('qAndA.noResults')}
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
