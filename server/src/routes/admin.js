require('dotenv').config()

const { Router } = require('express')
const auth = require('../middleware/auth')
const Image = require('../models/Image')
const Series = require('../models/Series')

const router = Router()

router.post('/new/series', auth, async (req, res) => {
  try {
    const { title, route, description, order } = req.body

    const series = new Series({
      title,
      route,
      description,
      order,
    })

    res.status(200).json({ message: 'Серия создана' })
  } catch (e) {
    res.status(500).json({ message: e })
    throw new Error(e)
  }
})

router.post('/new/image', auth, async (req, res) => {
  try {
    const { role } = req.query
    const { galleryId, placeholder, order, description } = req.body

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
