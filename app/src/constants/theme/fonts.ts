interface Font {
  family: string
  fallback: string
  weight: number
}

const fonts: Record<string, Font> = {
  body: {
    family: 'Roboto',
    fallback: 'sans-serif',
    weight: 400,
  },
  heading: {
    family: '"Roboto Slab"',
    fallback: 'sans-serif',
    weight: 800,
  },
  mono: {
    family: '"Roboto Mono"',
    fallback: 'monospace',
    weight: 400,
  },
}

export default fonts
