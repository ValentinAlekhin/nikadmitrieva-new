import { config } from 'dotenv'

import path from 'path'
import fs from 'fs-extra'
import { toString } from 'app-root-path'

config()

const appRoot = toString()
const dataDirName = process.env.IMAGE_DIR
const dataDir = path.join(appRoot, dataDirName)

const deleteSeriesImages = async (ids: string[]) => {
  try {
    const images = await fs.readdir(dataDir)

    for (const img of images) {
      for (const id of ids) {
        const imgId = img.split('_')[0]
        if (imgId === id) {
          const imgPath = path.join(dataDir, img)
          await fs.remove(imgPath)
        }
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}

export default deleteSeriesImages
