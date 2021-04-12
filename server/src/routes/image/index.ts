import { config } from 'dotenv'

import path from 'path'
import { Router } from 'express'
import { toString } from 'app-root-path'

import { createName } from '../../utils/cacheImageName'
import fileExists from '../../libs/fileExists'
import { resize, getMetadata } from '../../libs/sharp'
import getSizeFromList from '../../utils/getSizeFromList'

config()

const { IMAGE_DIR, CACHE_DIR } = process.env

const appRoot = toString()
const imagesDir = path.join(appRoot, IMAGE_DIR)
const cacheDir = path.join(appRoot, CACHE_DIR)

const router = Router()

router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params
    const { width: queryWidth } = req.query as {
      width: string
    }

    const width = getSizeFromList(+queryWidth, 200, 10)
    let imagePath = path.join(imagesDir, name)

    const isImageExists = await fileExists(imagePath)
    if (!isImageExists) {
      return res.status(404).json({ message: 'Изображение не найдено' })
    }

    const { width: originalWidth } = await getMetadata(imagePath)

    if (queryWidth && +width < originalWidth) {
      const newName = createName(name, { width })
      const cacheImagePath = path.join(cacheDir, newName)

      const isCacheImageExists = await fileExists(cacheImagePath)
      if (!isCacheImageExists) {
        await resize(imagePath, cacheImagePath, +width)
      }

      imagePath = cacheImagePath
    }

    res.sendFile(imagePath)
  } catch (e) {
    throw new Error(e)
  }
})

export default router
