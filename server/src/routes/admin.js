require('dotenv').config()

const fs = require('fs-extra')
const path = require('path')
const { Router } = require('express')
const appRoot = require('app-root-path').toString()
const auth = require('../middleware/auth')
const Image = require('../models/Image')
const Series = require('../models/Series')

const dataDirName = process.env.IMAGE_DIR

const router = Router()

router.post('/new/series', auth, async (req, res) => {
  try {
    const { title, route, description } = req.body

    const seriesObg = { title }
    if (route) seriesObg.route = route
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

router.post('/new/image', auth, async (req, res) => {
  try {
    const { seriesId, order, description } = req.query
    const { file } = req.body

    const imageObj = { seriesId, order }
    if (description) imageObj.description = description

    const image = new Image(imageObj)
    const id = image._id

    console.log(path.join(appRoot, 'buffer', id))
    // await fs.writeFile(path.join(appRoot, 'buffer', id), file)

    // await image.save()

    res.status(200).json({ message: 'Изображение добавлено' })
  } catch (e) {
    res.status(500).json({ message: e })
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
