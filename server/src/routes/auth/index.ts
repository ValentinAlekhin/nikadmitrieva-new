import { config } from 'dotenv'

import { Router } from 'express'
import jwt from 'jsonwebtoken'

config()

const router = Router()

const { PASSWORD, LOGIN, JWT_SECRET } = process.env

router.post('/', (req, res) => {
  const { password, login } = req.body

  if (password === PASSWORD && login === LOGIN) {
    const token = jwt.sign({ login }, JWT_SECRET, { expiresIn: 60 * 60 })

    return res.status(200).json({ message: 'Вы успешно вошли', token })
  }

  return res.status(401).json({ message: 'Логин или пароль неверный' })
})

router.post('/check', async (req, res) => {
  try {
    const { token } = req.body
    const decoded = jwt.verify(token, JWT_SECRET) as {
      login: string
    }

    if (decoded.login === LOGIN) {
      return res.status(200).json({ message: 'Токен валидный' })
    }
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Токен больше не валиден' })
      throw new Error(e)
    }

    res.status(500).json({ message: 'Ошибка на сервере' })
    throw new Error(e)
  }
})

export default router
