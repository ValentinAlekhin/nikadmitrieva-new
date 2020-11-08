require('dotenv').config()

const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')
const appRoot = require('app-root-path').toString()

const dataDirName = process.env.IMAGE_DIR
const dataDir = path.join(appRoot, dataDirName)

class Sharp {
  constructor(path, name) {
    this.path = path
    this.name = name
    this.webp = ''
    this.jpeg = ''
    this.width = null
    this.height = null
    this.aspectRatio = null
    this.stepSize = 400
    this.steps = 6
    this.tags = {
      original: 'orig',
      width: 'W',
      placeholder: 'palaceholder',
    }
    this.response = {
      webp: [],
      jpeg: [],
    }
  }

  async getData() {
    const { width, height } = await sharp(this.path).metadata()

    this.width = width
    this.height = height
    this.aspectRatio = width / height
    this.response.size = { width, height }
  }

  async compress() {
    this.jpeg = path.join(dataDir, `${this.name}_${this.tags.original}.jpeg`)
    this.webp = path.join(dataDir, `${this.name}_${this.tags.original}.webp`)

    await sharp(this.path)
      .jpeg({ quality: 80 })
      .withMetadata()
      .toFile(this.jpeg)

    await sharp(this.path)
      .withMetadata()
      .webp({ quality: 80 })
      .toFile(this.webp)
  }

  async createPlaceholder() {
    const fileName = `${this.name}_${this.tags.placeholder}.jpeg`

    await sharp(this.jpeg)
      .resize(400, null)
      .blur(20)
      .withMetadata()
      .toFile(path.join(dataDir, fileName))

    this.response.placeholder = `/${dataDirName}/${fileName}`
  }

  async resize(width, height) {
    const webpName = `${this.name}_${width + this.tags.width}.webp`
    const jpegName = `${this.name}_${width + this.tags.width}.jpeg`

    await sharp(this.webp)
      .resize(width, null)
      .withMetadata()
      .toFile(path.join(dataDir, webpName))
    await sharp(this.jpeg)
      .resize(width, null)
      .withMetadata()
      .toFile(path.join(dataDir, jpegName))

    this.response.jpeg.push({ width, src: `/${dataDirName}/${webpName}` })
    this.response.webp.push({ width, src: `/${dataDirName}/${jpegName}` })
  }

  async removeOriginal() {
    await fs.remove(this.jpeg)
    await fs.remove(this.webp)
  }

  async save() {
    try {
      const { width, height } = await sharp(this.path).metadata()
      this.response.size = { width, height }

      await this.compress()

      // for (let step = 1; step < this.steps; step++) {
      //   const currentWidth = step * this.stepSize
      //   const currentHight = Math.floor(currentWidth / this.aspectRatio)

      //   if (currentWidth <= this.width && currentHight <= this.height) {
      //     await this.resize(currentWidth, currentHight)
      //   } else {
      //     break
      //   }
      // }

      // await this.createPlaceholder()

      return this.response
    } catch (e) {
      console.log(e)
      throw e
    } finally {
      // await this.removeOriginal()
    }
  }
}

module.exports = Sharp
