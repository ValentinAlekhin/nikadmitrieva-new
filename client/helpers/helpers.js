import { IMAGE_TYPES, IMAGE_WIDTHS } from '~/constants/constants'

export const getSrcSetsById = (id) =>
  IMAGE_TYPES.map(({ ext, type }) => ({
    urls: IMAGE_WIDTHS.map(
      (width) => `/api/image?id=${id}&width=${width}&ext=${ext} ${width}w`
    ).join(',\n'),
    type,
    ext,
  }))

export const getSrcSetByFormats = (formats) =>
  Object.values(formats)
    .map((f) => `${f.url} ${f.width}w`)
    .join(',\n')
