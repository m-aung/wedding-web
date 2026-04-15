import styles from './QAndA.module.css'

const faqs = [
  {
    question: 'Can I bring a plus one?',
    answer: 'If your invitation includes a plus one, it will be noted on your RSVP. We appreciate your understanding as we keep the celebration intimate.',
  },
  {
    question: 'Are children invited?',
    answer: 'While we adore your little ones, this will be an adults-only celebration unless otherwise specified on your invitation.',
  },
  {
    question: 'What time should I arrive?',
    answer: 'Please plan to arrive 20 to 30 minutes before the ceremony begins so you have time to settle in comfortably.',
  },
  {
    question: 'Will transportation be available?',
    answer: 'Yes. Shuttle and parking details will be shared closer to the wedding date for all confirmed guests.',
  },
  {
    question: 'Who should I contact with questions?',
    answer: 'If you need help, please reach out to the wedding party or use the travel contact listed on the Travel & Registry page.',
  },
]

export default function QAndA() {
  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <p className="title-sm">Helpful Details</p>
          <h1 className={`display-lg ${styles.pageTitle}`}>
            Q&amp;A
          </h1>
          <p className="body-lg" style={{ marginTop: 24, maxWidth: 640 }}>
            A few helpful answers to make your experience easy, joyful, and stress-free.
          </p>
        </div>
      </section>

      <section className="section surface-low">
        <div className="container">
          <div className={styles.list}>
            {faqs.map((item) => (
              <article key={item.question} className={styles.item}>
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
