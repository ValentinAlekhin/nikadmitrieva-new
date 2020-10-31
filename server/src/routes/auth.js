require('dotenv').config()

const { Router } = require('express')
const jwt = require('jsonwebtoken')

const router = Router()

router.post('/', (req, res) => {
  const { PASSWORD, LOGIN, JWT_SECRET } = process.env
  const { password, login } = req.body

  if (password === PASSWORD && login === LOGIN) {
    const token = jwt.sign({ login }, JWT_SECRET, { expiresIn: 60 * 60 })

    res.status(200).json({ message: 'Вы успешно вошли', token })
  } else {
    res.status(401).json({ message: 'Логин или пароль неверный' })
  }
})

module.exports = router
