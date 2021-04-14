import { config } from 'dotenv'

import { Request, Response } from 'express'

import cache from '../../libs/cache'

import Image from '../../models/Image'
import Series from '../../models/Series'

config()

const root = async (req: Request, res: Response) => {
  try {
    const { originalUrl } = req

    const result = await cache.get(originalUrl, async () => {
      const imageDocuments = await Image.find().lean()
      const seriesDocuments = await Series.find().lean()

      const images = imageDocuments.map(img => ({
        ...img,
        jpg: `/api/client/image/${img._id}.jpg`,
        webp: `/api/client/image/${img._id}.webp`,
        placeholder: `/api/client/image/${img._id}_placeholder.jpg`,
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
}

export default root
