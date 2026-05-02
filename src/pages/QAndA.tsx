import styles from './QAndA.module.css'

type QAndAItem = {
  question: string,
  answer: string,
}
function generateQAndA(q:string, a:string):QAndAItem { 
  return {
    question: q,
    answer: a,
  }
}

const CeremonyStartTime = '4:00 PM'
const RecommendedArrivalTime = '3:00 PM'

const faqs:QAndAItem[] = [
  generateQAndA('What Time Should I Arrive?', `Please plan to array by ${RecommendedArrivalTime} to allow time to find parking and get settled before the ceremony begins at ${CeremonyStartTime}.`),
  generateQAndA('Is Parking Available at the Venue?', 'Parking is very limited. Please use nearby street parking. Kindly do not park on the grass. Carpooling is encouraged!'),
  generateQAndA('Do you have a gift registry?', 'Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we prefer monetary gift. Thank you for your generosity and love!'),
  generateQAndA('Will ceremony start on time?', `Yes, the ceremony will begin promptly at ${CeremonyStartTime}. We recommend arriving by ${RecommendedArrivalTime} to allow time for parking and finding your seat. We can\'t wait to celebrate with you!`),
  generateQAndA('Is the wedding outdoors?', 'Yes, our wedding will be held outdoors on grass. We recommend wearing comfortable shoes suitable for walking on grass. Please also bring a light layer for the evening. We can\'t wait to celebrate with you in our beautiful outdoor setting!'),
  generateQAndA('Can I take Photos During the ceremony?', 'We kindly ask that you refrain from taking photos during the ceremony. We have hired a professional photographer to capture every special moment, and we want everyone to be fully present and engaged in the experience. We will share the photos with you after the wedding so you can relive the memories!'),
  generateQAndA('Will there be food and drinks?', 'Yes, we will have a delicious buffet-style dinner with a variety of options to accommodate different dietary preferences. We will also have a selection of beverages, including alcoholic and non-alcoholic options, to keep you refreshed throughout the celebration. We can\'t wait to share this meal with you!'),
  generateQAndA('What time will the celebration end?', 'The celebration will officially end around 7:00 - 8:00 PM. However, we encourage everyone to stay and enjoy the festivities as long as they like! We will have music, dancing, and plenty of fun to keep the party going. We can\'t wait to celebrate with you until the very end!'),
  generateQAndA('Allergies or dietary restrictions?', 'We can accommodate most dietary restrictions and allergies - please note any allergies or preferences (gluten-free, vegetarian, nuts, shellfish, etc.) on the RSVP form or contact us directly. Our caterer will label dishes accordingly. For sever allergies or medically necessary accommodations email us directly at myoandyoon@gmail.com so we can confirm safe options.'),
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
