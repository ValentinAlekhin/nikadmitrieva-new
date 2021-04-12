interface Suffix {
  width?: number | string
  height?: number | string
}

export const createName = (originalName: string, suffix: Suffix) => {
  const [name, ext] = originalName.split('.')
  const tags: (string | number)[] = [name]

  if (suffix.width) tags.push(suffix.width + 'w')
  if (suffix.height) tags.push(suffix.height + 'h')

  return `${tags.join('_')}.${ext}`
}

export const parseName = (originalName: string) => {
  const [name, date, widthAndExt] = originalName.split('_')
  const [width, ext] = widthAndExt.split('.')

  return { name, date, width, ext }
}
