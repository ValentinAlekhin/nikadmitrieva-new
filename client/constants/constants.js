export const IMAGE_WIDTHS = Array(10)
  .fill('')
  .map((_, i) => (i + 1) * 200)

export const IMAGE_TYPES = ['avif', 'webp', 'jpeg'].map((ext) => ({
  type: `image/${ext}`,
  ext,
}))

export const MASONRY_GRID_BREAKPOINTS = [
  { width: 768, cols: 1 },
  { width: 992, cols: 2 },
  { width: 1400, cols: 3 },
]
