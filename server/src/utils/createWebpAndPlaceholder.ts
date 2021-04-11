import { config } from 'dotenv'

import path from 'path'
import sharp from 'sharp'
import { toString } from 'app-root-path'

config()

sharp.cache(false)

const appRoot = toString()
const dataDirName = process.env.IMAGE_DIR
const dataDir = path.join(appRoot, dataDirName)

const convertToWebp = async (image: string, name: string) => {
  const webpPath = path.join(dataDir, `${name}.webp`)

  await sharp(image).webp().withMetadata().rotate().toFile(webpPath)
}

const createPlaceholder = async (image: string, name: string) => {
  const fileName = `${name}_placeholder.jpg`

  await sharp(image)
    .withMetadata()
    .resize(600, null)
    .blur(30)
    .toFile(path.join(dataDir, fileName))
}

const createWebpAndPlaceholder = async (imagePath: string, name: string) => {
  try {
    await convertToWebp(imagePath, name)
    await createPlaceholder(imagePath, name)
  } catch (e) {
    throw new Error(e)
  }
}

export default createWebpAndPlaceholder
