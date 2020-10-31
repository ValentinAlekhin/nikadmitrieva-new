require('dotenv').config()

const { Router } = require('express')
const Image = require('../models/Image')
const Series = require('../models/Series')

const router = Router()

router.get('/', async (req, res) => {
  try {
    const series = await Series.find()
    const images = await Image.find()

    res.status(200).json({ series, images })
  } catch (e) {
    res.status(500).json({ message: e })
    throw new Error(e)
  }
})
