import { config } from 'dotenv'

import path from 'path'
import sharp from 'sharp'
import { toString } from 'app-root-path'

config()

sharp.cache({ files: 6 })

const appRoot = toString()
const dataDirName = process.env.IMAGE_DIR
const dataDir = path.join(appRoot, dataDirName)

const convertToWebp = async (image: string) => {
  await sharp(image).webp().withMetadata().rotate().toBuffer()
}

const createPlaceholder = async (image: string, name: string) => {
  const fileName = `${name}_placeholder.jpeg`

  await sharp(image)
    .blur(20)
    .withMetadata()
    .toFile(path.join(dataDir, fileName))
}

const createWebpAndPlaceholder = async (imagePath: string, name: string) => {
  try {
    await convertToWebp(imagePath)
    await createPlaceholder(imagePath, name)
  } catch (e) {
    throw e
  }
}

export default createWebpAndPlaceholder
