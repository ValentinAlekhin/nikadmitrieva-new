import sharp from 'sharp'

sharp.cache(false)

const resize = async (
  src: string,
  dest: string,
  width: number = null,
  height: number = null
) => await sharp(src).withMetadata().resize(width, height).toFile(dest)

const blurFunc = async (src: string, dest: string, blur: number = 20) =>
  await sharp(src).blur(blur).toFile(dest)

const getMetadata = async (src: string) => await sharp(src).metadata()

export { resize, blurFunc as blur, getMetadata }
