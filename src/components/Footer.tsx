import styles from './Footer.module.css'
import { BRIDE, GROOM, WEDDING } from '../constants/couple'

export default function Footer() {
  const monogram = `${GROOM.nickname.charAt(0)} & ${BRIDE.nickname.charAt(0)}`

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.signatureBlock}>
          <p className={styles.brand}>{monogram}</p>
          <div className={styles.rule} />
          <p className={styles.copy}>{WEDDING.date.replace('September 19, 2026', '9.19.2026')}</p>
        </div>
      </div>
      <div className={styles.lace} aria-hidden="true" />
    </footer>
  )
}
