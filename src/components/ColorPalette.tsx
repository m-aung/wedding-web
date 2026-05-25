import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ColorPalette.module.css'

const palette = [
  { name: 'Ivory',      hex: '#e8ddd0' },
  { name: 'Champagne',  hex: '#c4ad84' },
  { name: 'Dusty Rose', hex: '#c9a99b' },
  { name: 'Mauve',      hex: '#b0a3c0' },
  { name: 'Dusty Blue', hex: '#8fa4b5' },
  { name: 'Sage',       hex: '#9caf9a' },
  { name: 'Forest',     hex: '#4a6b5a' },
  { name: 'Navy',       hex: '#3b4e6e' },
  { name: 'Charcoal',   hex: '#4a4a4a' },
  { name: 'Taupe',      hex: '#a09590' },
]

const reserved = [
  { name: 'White',          hex: '#f5f4f2' },
  { name: 'Peach / Salmon', hex: '#f0a890' },
]

const CX = 130, CY = 130, OUTER_R = 116, INNER_R = 46
const PUSH = 10
const START = -Math.PI / 2 // 12 o'clock

function buildSegment(i: number, total: number) {
  const step = (2 * Math.PI) / total
  const a1 = START + i * step
  const a2 = START + (i + 1) * step
  const large = step > Math.PI ? 1 : 0

  const x1 = CX + OUTER_R * Math.cos(a1)
  const y1 = CY + OUTER_R * Math.sin(a1)
  const x2 = CX + OUTER_R * Math.cos(a2)
  const y2 = CY + OUTER_R * Math.sin(a2)
  const x3 = CX + INNER_R * Math.cos(a2)
  const y3 = CY + INNER_R * Math.sin(a2)
  const x4 = CX + INNER_R * Math.cos(a1)
  const y4 = CY + INNER_R * Math.sin(a1)

  const d = [
    `M ${x1} ${y1}`,
    `A ${OUTER_R} ${OUTER_R} 0 ${large} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${INNER_R} ${INNER_R} 0 ${large} 0 ${x4} ${y4}`,
    'Z',
  ].join(' ')

  const mid = START + (i + 0.5) * step
  const tx = (Math.cos(mid) * PUSH).toFixed(2)
  const ty = (Math.sin(mid) * PUSH).toFixed(2)

  return { d, tx, ty }
}

export default function ColorPalette() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const activeColor = hoveredIndex !== null ? palette[hoveredIndex] : null

  return (
    <div ref={ref} className={styles.root}>
      <div className={`${styles.wheelWrap} ${visible ? styles.wheelVisible : ''}`}>
        <svg
          viewBox="-14 -14 288 288"
          className={styles.wheel}
          aria-hidden="true"
        >
          {palette.map((c, i) => {
            const { d, tx, ty } = buildSegment(i, palette.length)
            const isActive = hoveredIndex === i
            return (
              <path
                key={c.hex}
                d={d}
                fill={c.hex}
                className={`${styles.segment} ${isActive ? styles.segmentActive : ''}`}
                style={{ '--tx': `${tx}px`, '--ty': `${ty}px` } as React.CSSProperties}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            )
          })}
          {activeColor && (
            <text
              x={CX}
              y={CY + 5}
              textAnchor="middle"
              className={styles.centerLabel}
              fill="currentColor"
            >
              {activeColor.name}
            </text>
          )}
        </svg>
      </div>

      <div className={styles.chips}>
        {palette.map((c, i) => (
          <div
            key={c.hex}
            className={`${styles.chip} ${visible ? styles.chipVisible : ''} ${hoveredIndex === i ? styles.chipActive : ''}`}
            style={visible ? { animationDelay: `${0.5 + i * 0.07}s` } : undefined}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className={styles.dot} style={{ background: c.hex }} />
            <span className="label-md">{c.name}</span>
          </div>
        ))}
      </div>

      <div className={`${styles.reserved} ${visible ? styles.reservedVisible : ''}`}>
        <p className="title-sm">{t('dressCode.paletteReserved')}</p>
        <div className={styles.chips}>
          {reserved.map(c => (
            <div key={c.hex} className={`${styles.chip} ${styles.chipVisible}`}>
              <span className={`${styles.dot} ${styles.reservedDot}`} style={{ background: c.hex }} />
              <span className="label-md">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
