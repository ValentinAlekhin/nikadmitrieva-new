import { config } from 'dotenv'

import { Router } from 'express'

import cache from '../../libs/cache'

import Image from '../../models/Image'
import Series from '../../models/Series'

config()

const { BASE_URL } = process.env

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { originalUrl } = req

    const result = await cache.get(originalUrl, async () => {
      const imageDocuments = await Image.find().lean()
      const seriesDocuments = await Series.find().lean()

      const images = imageDocuments.map(img => ({
        ...img,
        jpg: `${BASE_URL}/image/${img._id}.jpg`,
        webp: `${BASE_URL}/image/${img._id}.webp`,
        placeholder: `${BASE_URL}/image/${img._id}_placeholder.jpg`,
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

router.put('/view/series/:id', async (req, res) => {
  try {
    const { id } = req.params

    await Series.findByIdAndUpdate(id, { $inc: { clicks: 1 } })

    res.status(200).send()
  } catch (e) {
    res.status(500).json({ message: e })
    throw new Error(e)
  }
})

router.put('/view/image/:id', async (req, res) => {
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
