const { exec } = require('child_process')
const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') })
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.BUILDER_PORT || 3001
const builderKey = process.env.BUILDER_KEY

const appDir = path.join(__dirname, '..')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

const buildClient = () => new Promise((resolve, reject) => {
  const build = exec(`npm run generate --prefix ${appDir}`)

  build.stdout.on('data', e => console.log(e))
  build.stdout.on('error', e => reject(e))
  build.stdout.on('end', e => resolve(e))
})

app.post('/build', async (req, res) => {
  try {
    const { key } = req.body

    if (!key && key !== builderKey) return res.status(403).send()

    await buildClient()

    res.send()
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

app.listen(port, () => {
  console.log(`Client builder listening on port ${port}`)
})

