import { config } from 'dotenv'

import http2 from 'http2'
import fs from 'fs-extra'
import express from 'express'
import spdy from 'spdy'
import mongoose from 'mongoose'
import cors from 'cors'
import compression from 'compression'

import authRoute from './routes/auth'
import clientRoute from './routes/client'
import adminRoute from './routes/admin'
import { Http2ServerRequest, Http2ServerResponse } from 'node:http2'

config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(compression())

app.use('/api/auth', authRoute)
app.use('/api/client', clientRoute)
app.use('/api/admin', adminRoute)

const spdyOptions = {
  protocols: ['h2', 'spdy/3.1', 'http/1.1'],
  plain: false,
  'x-forwarded-for': true,
}

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    const [key, cert] = await Promise.all([
      fs.readFile('./key.pem'),
      fs.readFile('./certificate.pem'),
    ])

    http2
      .createSecureServer(
        { key, cert },
        app as { request: Http2ServerRequest; response: Http2ServerResponse }
      )
      .listen(PORT, () => {
        console.log(`Server has been started on port: ${PORT}`)
      })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

start()
