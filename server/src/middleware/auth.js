require('dotenv').config()

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') return next()
  const { JWT_SECRET, LOGIN } = process.env

  try {
    const [, token] = req.headers.authorization.split(' ')
    if (!token) return res.status(401).json({ message: 'Нет авторизации' })

    const decoded = jwt.verify(token, JWT_SECRET)

    if (decoded.login === LOGIN) return next()

    res.status(401).json({ message: 'Нет авторизации' })
  } catch (err) {
    res.status(401).json({ message: 'Нет авторизации' })
  }
}
