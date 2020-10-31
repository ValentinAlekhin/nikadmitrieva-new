require('dotenv').config()

const { Router } = require('express')
const jwt = require('jsonwebtoken')

const router = Router()

const { PASSWORD, LOGIN, JWT_SECRET } = process.env

router.post('/', (req, res) => {
  const { password, login } = req.body

  if (password === PASSWORD && login === LOGIN) {
    const token = jwt.sign({ login }, JWT_SECRET, { expiresIn: 2 })

    res.status(200).json({ message: 'Вы успешно вошли', token })
  } else {
    res.status(401).json({ message: 'Логин или пароль неверный' })
  }
})

router.post('/check', async (req, res) => {
  try {
    const { token } = req.body
    const decoded = jwt.verify(token, JWT_SECRET)
    if (decoded.login === LOGIN) {
      res.status(200).json({ message: 'Токен валидный' })
    } else res.status(401).json({ message: 'Токен больше не валиден' })
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Токен больше не валиден' })
    } else res.status(500).json({ message: 'Ошибка на сервере' })
  }
})

module.exports = router
