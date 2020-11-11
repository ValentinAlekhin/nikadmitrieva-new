require('dotenv').config()

const fs = require('fs-extra')
const path = require('path')
const { Router } = require('express')
const appRoot = require('app-root-path').toString()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')
const Image = require('../models/Image')
const Series = require('../models/Series')
const Sharp = require('../helpers/sharp')

const router = Router()

router.post('/new/series', auth, async (req, res) => {
  try {
    const { title, url, description } = req.body

    const seriesObg = { title }
    if (url) seriesObg.url = url
    if (description) seriesObg.description = description

    seriesObg.order = (await Series.countDocuments()) + 1

    const series = new Series(seriesObg)
    await series.save()

    const seriesId = series._id

    res.status(200).json({ message: 'Серия создана', seriesId })
  } catch (e) {
    res.status(500).json({ message: e })
    throw new Error(e)
  }
})

router.post('/new/image', auth, multer, async (req, res) => {
  try {
    const image = new Image(req.query)
    const id = image._id

    const sharpImg = new Sharp(req.file.path, id)
    const sharpResponse = await sharpImg.save()

    image.overwrite({ ...sharpResponse, ...req.query })
    await image.save()

    res.status(200).json({ message: 'Изображение добавлено' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

router.post('/new/', auth, async (req, res) => {
  try {
    const {} = req.body
  } catch (e) {
    res.status(500).json({ message: e })
  }
})

module.exports = router
