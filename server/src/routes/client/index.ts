import { config } from 'dotenv'

import { Router } from 'express'

import CacheService from '../../cache'

import Image from '../../models/Image'
import Series from '../../models/Series'

config()

const { TTL } = process.env

const cache = new CacheService(+TTL)

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { originalUrl } = req

    const result = await cache.get(originalUrl, async () => {
      const imageDocuments = await Image.find().lean()
      const seriesDocuments = await Series.find().lean()

      const images = imageDocuments.map(img => ({
        ...img,
        jpg: `images/${img._id}.jpg`,
        webp: `images/${img._id}.webp`,
        placeholder: `images/${img._id}_placeholder.jpg`,
      }))

      const series = seriesDocuments.map(ser => ({
        ...ser,
        titleImage: images.find(
          ({ order, series_id }) => order === 1 && series_id === ser._id
        ),
      }))

      return { images, series }
    })

    res.status(200).json(result)
  } catch (e) {
    res.status(500).json({ message: e })
    throw new Error(e)
  }
})

router.get('/view/series/:id', async (req, res) => {
  try {
    const { id } = req.params

    await Series.findByIdAndUpdate(id, { $inc: { clicks: 1 } })

    res.status(200).send()
  } catch (e) {
    res.status(500).json({ message: e })
    throw new Error(e)
  }
})

router.get('/view/image/:id', async (req, res) => {
  try {
    const { id } = req.params

    await Image.findByIdAndUpdate(id, { $inc: { clicks: 1 } })

    res.status(200).send()
  } catch (e) {
    res.status(500).json({ message: e })
    throw new Error(e)
  }
})

export default router
