require('dotenv').config()

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/client', require('./routes/client'))
app.use('/api/admin', require('./routes/admin'))

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
