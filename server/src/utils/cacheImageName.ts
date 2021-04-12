export const createName = (originalName: string, width: number | string) => {
  const [name, ext] = originalName.split('.')

  return `${name}_${width}.${ext}`
}

export const parseName = (originalName: string) => {
  const [name, date, widthAndExt] = originalName.split('_')
  const [width, ext] = widthAndExt.split('.')

  return { name, date, width, ext }
}
