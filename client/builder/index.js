const { exec } = require('child_process')
const path = require('path')
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3001

const appDir = path.join(__dirname, '..')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

app.get('/build', (req, res) => {
  const build = exec(`npm run generate --prefix ${appDir}`)

  build.stdout.on('data', e => console.log(e))
  build.stdout.on('error', (e) => {
    console.log(e)
    res.status(500).send(e)
  })
  build.stdout.on('end', () => res.send('finish'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

