import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import styles from './LightboxImage.module.css'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Pass an existing wrapper className to transfer to the trigger div (e.g. imageWrap). */
  containerClassName?: string
}

export default function LightboxImage({ containerClassName, ...imgProps }: Props) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  return (
    <>
      <div
        className={`${styles.trigger}${containerClassName ? ` ${containerClassName}` : ''}`}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View full image${imgProps.alt ? `: ${imgProps.alt}` : ''}`}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpen(true) }}
      >
        <img {...imgProps} />
        <span className={styles.hint} aria-hidden="true">
          <span className="material-icons">zoom_in</span>
        </span>
      </div>

      {open && createPortal(
        <div
          className={styles.backdrop}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={imgProps.alt ?? 'Image preview'}
        >
          <button className={styles.closeBtn} onClick={close} aria-label="Close image">
            <span className="material-icons">close</span>
          </button>
          <img
            {...imgProps}
            className={styles.lightboxImg}
            onClick={e => e.stopPropagation()}
          />
        </div>,
        document.body,
      )}
    </>
  )
}
