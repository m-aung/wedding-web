import styles from './MastheadIntro.module.css'
import { BRIDE, GROOM, WEDDING } from '../constants/couple'

type MastheadIntroProps = {
  className?: string
  compact?: boolean
  showCountdown?: boolean
}

export default function MastheadIntro({
  className = '',
  compact = false,
  showCountdown = true,
}: MastheadIntroProps) {
  const daysToGo = Math.max(
    0,
    Math.ceil((new Date(WEDDING.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  )

  return (
    <div className={`${styles.root} ${compact ? styles.compact : ''} ${className}`.trim()}>
      <p className={`title-sm ${styles.union}`}>The Union of</p>
      <h1 className={`display-lg ${styles.title}`}>
        {GROOM.nickname}<span className={styles.amp}>&amp;</span>{BRIDE.nickname}
      </h1>
      <p className={`label-md ${styles.meta}`}>
        {WEDDING.dateLong} &nbsp;•&nbsp; {WEDDING.venueCity}, NY
      </p>
      {showCountdown && daysToGo > 0 && <p className={styles.countdown}>{daysToGo} days to go!</p>}
    </div>
  )
}
