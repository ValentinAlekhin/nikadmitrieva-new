import dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'
import compression from 'compression'

import DB from './libs/database'

import authRoute from './routes/auth'
import clientRoute from './routes/client'
import adminRoute from './routes/admin'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(compression())

app.use('/api/auth', authRoute)
app.use('/api/client', clientRoute)
app.use('/api/admin', adminRoute)

async function start() {
  try {
    await DB.connect()

    app.listen(PORT, () =>
      console.log(`Server has been started on port: ${PORT}`)
    )
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

start()
