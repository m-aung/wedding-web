import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'
import { BRIDE, GROOM } from '../constants/couple'

export default function Footer() {
  const { t } = useTranslation()
  const monogram = `${GROOM.nickname.charAt(0)} & ${BRIDE.nickname.charAt(0)}`

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.signatureBlock}>
          <p className={styles.brand}>{monogram}</p>
          <div className={styles.rule} />
          <p className={styles.copy}>{t('common.weddingDateShort')}</p>
        </div>
      </div>
      <div className={styles.lace} aria-hidden="true" />
    </footer>
  )
}
