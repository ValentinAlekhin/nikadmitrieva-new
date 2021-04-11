import { config } from 'dotenv'

import fs from 'fs-extra'
import path from 'path'
import { Router } from 'express'
import { generate as createId } from 'shortid'
import { toString } from 'app-root-path'

import auth from '../../middleware/auth'
import multer from '../../middleware/multer'

import ImageSchema, { Image } from '../../models/Image'
import SeriesSchema, { Series } from '../../models/Series'

import createWebpAndPlaceholder from '../../utils/createWebpAndPlaceholder'

import deleteSeriesImages from '../../utils/deleteSeriesImages'

config()

const appRoot = toString()
const dataDirName = process.env.IMAGE_DIR
const dataDir = path.join(appRoot, dataDirName)

const router = Router()

router.post('/new/series', auth, async (req, res) => {
  try {
    const { title, url, description } = req.body

    const _id = createId()
    const order = (await SeriesSchema.countDocuments()) + 1

    const seriesObj: Series = { _id, url: _id, order, title, views: 0 }

    if (url) seriesObj.url = url
    if (description) seriesObj.description = description

    const series = new SeriesSchema(seriesObj)
    await series.save()

    res.status(200).json({ message: 'Серия создана', seriesId: _id })
  } catch (e) {
    res.status(500).json({ message: e })
    throw new Error(e)
  }
})

router.post('/new/image', multer, async (req, res) => {
  try {
    const { seriesId, order } = req.query as { seriesId: string; order: string }
    const { path: imagePath } = req.file

    const _id = createId()

    const imageObj: Image = {
      _id,
      series_id: seriesId,
      order: +order,
      views: 0,
    }

    await createWebpAndPlaceholder(imagePath, _id)
    await fs.move(imagePath, path.join(dataDir, `${_id}.jpg`))

    const image = new ImageSchema(imageObj)
    await image.save()

    res.status(200).json({ message: 'Изображение добавлено' })
  } catch (e) {
    res.status(500).json({ message: e.message })
    throw new Error(e)
  }
})

router.delete('/series/:id', auth, async (req, res) => {
  try {
    const { id } = req.params

    const images = await ImageSchema.find({ seriesId: id })
    const ids = images.map(({ _id }) => _id)

    await SeriesSchema.findByIdAndDelete(id)
    await ImageSchema.collection.deleteMany({ seriesId: id })
    await deleteSeriesImages(ids)

    res.status(200).json({ message: 'Серия удалена' })
  } catch (e) {
    res.status(500).json({ message: e })
    throw new Error(e)
  }
})

export default router
