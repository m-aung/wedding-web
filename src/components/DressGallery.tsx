import styles from './DressGallery.module.css'

type SilhouetteType = 'dress-a' | 'dress-b' | 'suit'

interface Outfit {
  id: string
  silhouette: SilhouetteType
  color: string
  colorName: string
  outfitName: string
  note: string
}

const outfits: Outfit[] = [
  { id: 'dusty-rose',  silhouette: 'dress-a', color: '#c9a99b', colorName: 'Dusty Rose',  outfitName: 'Midi Dress',        note: 'Short to ankle length'  },
  { id: 'champagne',   silhouette: 'suit',    color: '#c4ad84', colorName: 'Champagne',    outfitName: 'Blazer & Trousers', note: 'No tie needed'          },
  { id: 'sage',        silhouette: 'dress-b', color: '#9caf9a', colorName: 'Sage',         outfitName: 'Flowing Gown',      note: 'Long dress or gown'     },
  { id: 'navy',        silhouette: 'suit',    color: '#3b4e6e', colorName: 'Navy',         outfitName: 'Classic Suit',      note: 'Suit or smart blazer'   },
  { id: 'mauve',       silhouette: 'dress-a', color: '#b0a3c0', colorName: 'Mauve',        outfitName: 'Cocktail Dress',    note: 'Short or midi length'   },
  { id: 'forest',      silhouette: 'suit',    color: '#4a6b5a', colorName: 'Forest',       outfitName: 'Evening Suit',      note: 'Suit or smart blazer'   },
  { id: 'dusty-blue',  silhouette: 'dress-b', color: '#8fa4b5', colorName: 'Dusty Blue',   outfitName: 'Evening Gown',      note: 'Long dress or gown'     },
  { id: 'ivory',       silhouette: 'dress-a', color: '#e8ddd0', colorName: 'Ivory',        outfitName: 'Lace Dress',        note: 'Cream tones welcome'    },
]

const SILHOUETTES: Record<SilhouetteType, { viewBox: string; paths: string[] }> = {
  'dress-a': {
    viewBox: '0 0 80 120',
    paths: [
      'M 40 10 C 46 7 54 10 58 18 L 60 38 C 61 47 59 54 57 58 C 62 70 70 94 72 114 L 8 114 C 10 94 18 70 23 58 C 21 54 19 47 20 38 L 22 18 C 26 10 34 7 40 10 Z',
    ],
  },
  'dress-b': {
    viewBox: '0 0 80 120',
    paths: [
      'M 40 10 C 47 7 56 10 60 18 L 62 36 C 64 47 60 55 57 60 C 65 74 78 100 80 114 L 0 114 C 2 100 15 74 23 60 C 20 55 16 47 18 36 L 20 18 C 24 10 33 7 40 10 Z',
    ],
  },
  suit: {
    viewBox: '0 0 80 120',
    paths: [
      'M 40 16 C 44 12 54 8 64 12 L 72 20 L 70 66 L 10 66 L 8 20 L 16 12 C 26 8 36 12 40 16 Z',
      'M 10 68 L 38 68 L 36 114 L 12 114 Z M 42 68 L 70 68 L 68 114 L 44 114 Z',
    ],
  },
}

function Silhouette({ type, color }: { type: SilhouetteType; color: string }) {
  const { viewBox, paths } = SILHOUETTES[type]
  return (
    <svg viewBox={viewBox} className={styles.svg} aria-hidden="true">
      {paths.map((d, i) => (
        <path key={i} d={d} fill={color} />
      ))}
    </svg>
  )
}

export default function DressGallery() {
  return (
    <div className={styles.wrap}>
      <div className={styles.rod} />
      <div className={styles.rail}>
        {outfits.map(outfit => (
          <div key={outfit.id} className={styles.card}>
            <div className={styles.hook} />
            <Silhouette type={outfit.silhouette} color={outfit.color} />
            <div className={styles.info}>
              <span className={styles.swatch} style={{ background: outfit.color }} />
              <span className="label-md">{outfit.colorName}</span>
              <p className={styles.outfitName}>{outfit.outfitName}</p>
              <p className={`label-md ${styles.note}`}>{outfit.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
