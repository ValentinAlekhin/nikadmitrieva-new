import { config } from 'dotenv'

import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import authRoute from './routes/auth.js'
import clientRoute from './routes/client.js'
import adminRoute from './routes/admin.js'

config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/client', clientRoute)
app.use('/api/admin', adminRoute)

app.use('/data', express.static(path.join(__dirname, '../data')))

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    app.listen(PORT, () =>
      console.log(`Server has been started on port: ${PORT}`)
    )
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

start()
