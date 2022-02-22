export const IMAGE_WIDTHS = Array(10).fill('').map((_, i) => (i + 1) * 200)

export const IMAGE_TYPES = ['avif', 'webp', 'jpeg'].map(ext => ({
  type: `image/${ ext }`,
  ext,
}))
