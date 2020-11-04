require('dotenv').config()

const { Router } = require('express')
const auth = require('../middleware/auth')
const Image = require('../models/Image')
const Series = require('../models/Series')

const router = Router()

router.post('/new/series', auth, async (req, res) => {
  try {
    const { title, route, description } = req.body

    const seriesObg = { title }
    if (route) seriesObg.route = route
    if (description) seriesObg.description = description

    seriesObg.order = (await Series.count()) + 1

    const series = new Series(seriesObg)

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

    const image = new Image({})

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
