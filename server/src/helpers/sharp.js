require('dotenv').config()

const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')
const appRoot = require('app-root-path').toString()

sharp.cache({ files: 6 })

const dataDirName = process.env.IMAGE_DIR
const dataDir = path.join(appRoot, dataDirName)

class Sharp {
  constructor(path, name) {
    this.path = path
    this.name = name
    this.webp = null
    this.jpeg = null
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

  async compress() {
    // this.jpeg = path.join(dataDir, `${this.name}_${this.tags.original}.jpeg`)
    // this.webp = path.join(dataDir, `${this.name}_${this.tags.original}.webp`)

    try {
      this.jpeg = await sharp(this.path)
        .jpeg()
        .withMetadata()
        .rotate()
        .toBuffer()
      this.webp = await sharp(this.path)
        .webp()
        .withMetadata()
        .rotate()
        .toBuffer()
    } catch (e) {
      throw e
    }
  }

  async createPlaceholder() {
    const fileName = `${this.name}_${this.tags.placeholder}.jpeg`

    try {
      await sharp(this.jpeg)
        .resize(800, null)
        .blur(20)
        .withMetadata()
        .toFile(path.join(dataDir, fileName))

      this.response.placeholder = `/${dataDirName}/${fileName}`
    } catch (e) {
      throw e
    }
  }

  async resize(width) {
    const webpName = `${this.name}_${width + this.tags.width}.webp`
    const jpegName = `${this.name}_${width + this.tags.width}.jpeg`

    try {
      await sharp(this.webp)
        .resize(width, null)
        .withMetadata()
        .rotate()
        .toFile(path.join(dataDir, webpName))

      await sharp(this.jpeg)
        .resize(width, null)
        .withMetadata()
        .rotate()
        .toFile(path.join(dataDir, jpegName))

      this.response.webp.push({ width, src: `/${dataDirName}/${webpName}` })
      this.response.jpeg.push({ width, src: `/${dataDirName}/${jpegName}` })
    } catch (e) {
      throw e
    }
  }

  async removeOriginal() {
    try {
      await fs.unlink(this.path)
    } catch (e) {
      throw e
    }
  }

  async save() {
    try {
      const { width, height } = await sharp(this.path).metadata()
      this.response.size = { width, height }

      await this.compress()

      for (let step = 1; step < this.steps; step++) {
        const currentWidth = step * this.stepSize

        if (currentWidth <= width) {
          await this.resize(currentWidth)
        } else {
          break
        }
      }

      await this.createPlaceholder()
      await this.removeOriginal()

      return this.response
    } catch (e) {
      throw { message: e.toString() }
    }
  }
}

module.exports = Sharp
