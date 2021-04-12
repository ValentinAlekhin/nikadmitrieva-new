import { config } from 'dotenv'

import path from 'path'
import { Router } from 'express'
import sharp from 'sharp'
import { toString } from 'app-root-path'

import { createName } from '../../utils/cacheImageName'
import fileExists from '../../libs/fileExists'

config()

sharp.cache(false)

const appRoot = toString()
const imagesDirName = process.env.IMAGE_DIR
const imagesDir = path.join(appRoot, imagesDirName)
const cacheDir = path.join(appRoot, 'data', 'cache')

const router = Router()

router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params
    const { width } = req.query as { width: string }

    const imagePath = path.join(imagesDir, name)

    if (width) {
      const newName = createName(name, width)
      const cacheImagePath = path.join(cacheDir, newName)

      const isImageExists = await fileExists(cacheImagePath)
      if (isImageExists) {
        return res.sendFile(cacheImagePath)
      }

      await sharp(imagePath)
        .withMetadata()
        .resize(+width)
        .toFile(cacheImagePath)

      return res.sendFile(cacheImagePath)
    }

    res.sendFile(imagePath)
  } catch (e) {
    throw new Error(e)
  }
})

export default router
