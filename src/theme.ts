/** Design tokens extracted from Stitch "Wedding Web 2026" project */
export const colors = {
  background: 'rgb(255 255 254)',
  surface: 'rgb(255 255 254)',
  surfaceBright: 'rgb(255 255 254)',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f4f3',
  surfaceContainer: '#edeeed',
  surfaceContainerHigh: '#e6e9e8',
  surfaceContainerHighest: '#dfe3e2',
  surfaceDim: '#d6dbda',

  onBackground: '#2f3333',
  onSurface: '#2f3333',
  onSurfaceVariant: '#5b605f',

  primary: '#5f5e5e',
  primaryDim: '#535252',
  primaryContainer: '#e4e2e1',
  onPrimary: '#faf7f6',
  onPrimaryContainer: '#525151',

  secondary: '#705b44',
  secondaryDim: '#635039',
  secondaryContainer: '#fadec0',
  onSecondary: '#fff7f3',
  onSecondaryContainer: '#624e38',

  tertiary: '#7e572e',
  tertiaryDim: '#704b23',
  tertiaryContainer: '#d9a777',
  onTertiary: '#fff7f4',

  outline: '#777c7b',
  outlineVariant: '#aeb3b2',

  error: '#9e422c',
  errorContainer: '#fe8b70',
  onError: '#fff7f6',
} as const;

export const fonts = {
  display: "'Newsreader', Georgia, serif",
  body: "'Work Sans', system-ui, sans-serif",
} as const;

/** Spacing multiplier (scale = 3, base = 4px => 12px unit) */
export const spacing = (n: number) => `${n * 12}px`;
