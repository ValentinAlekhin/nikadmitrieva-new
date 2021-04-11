import { config } from 'dotenv'

import { Router } from 'express'
import Image from '../../models/Image'
import Series from '../../models/Series'

config()

const router = Router()

router.get('/', async (_, res) => {
  try {
    const series = await Series.find()
    const images = await Image.find()

    res.status(200).json({ series, images })
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
