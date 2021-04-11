import { config } from 'dotenv'

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

config()

const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') return next()

  const { JWT_SECRET, LOGIN } = process.env

  try {
    const [, token] = req.headers.authorization.split(' ')
    if (!token) return res.status(401).json({ message: 'Нет авторизации' })

    const decoded = jwt.verify(token, JWT_SECRET) as { login: string }

    if (decoded.login === LOGIN) return next()

    res.status(401).json({ message: 'Нет авторизации' })
  } catch (err) {
    res.status(401).json({ message: 'Нет авторизации' })
  }
}

export default auth
