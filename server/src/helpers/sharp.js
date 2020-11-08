require('dotenv').config()

const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')
const appRoot = require('app-root-path').toString()

const dataDirName = process.env.IMAGE_DIR
const dataDir = appRoot + dataDirName

class Sharp {
  constructor(path, name) {
    this.path = path
    this.name = name
    this.webp = ''
    this.jpeg = ''
    this.width = null
    this.height = null
    this.aspectRatio = this.width / this.height
    this.stepSize = 400
    this.steps = 6
    this.tags = {
      original: 'orig',
      width: 'W',
      placeholder: 'palaceholder',
    }
    this.response = {}
  }

  async getData() {
    const filePath = (await fs.readdir(this.path))[0]
    const { width, height } = await sharp(filePath).metadata()
    this.width = width
    this.height = height
    this.response.size = { widt, height }
  }

  async compress() {
    this.jpeg = path.join(this.path, `${this.name}_${this.tags.original}.jpeg`)
    this.webp = path.join(this.path, `${this.name}_${this.tags.original}.webp`)
    await sharp(this.path).jpeg({ quality: 80 }).toFile(this.jpeg)
    await sharp(this.path).webp({ quality: 80 }).toFile(this.webp)
  }

  async createPlaceholder() {
    const fileName = `${this.name}_${this.tags.placeholder}.jpeg`
    const height = 400 * this.aspectRatio
    await sharp(this.jpeg)
      .resize(400, height)
      .blur(20)
      .toFile(path.join(dataDir, fileName))
    this.response.placeholder = `/${dataDirName}/${fileName}`
  }

  async resize(width, height) {
    const webpName = `${this.name}_${width + settings.tags.width}.webp`
    const jpegName = `${this.name}_${width + settings.tags.width}.jpeg`
    await sharp(this.buffer.webp)
      .resize(width, height)
      .toFile(path.join(rootDir, this.pathToSave, webpName))
    await sharp(this.buffer.jpeg)
      .resize(width, height)
      .toFile(path.join(rootDir, this.pathToSave, jpegName))
    this.response.main[width + this.tags.factorName] = {
      webp: `/${this.pathToSave}/${webpName}`,
      jpeg: `/${this.pathToSave}/${jpegName}`,
    }
  }

  async save() {
    await this.getData()
    await this.compress()
    await this.createPlaceholder()

    for (let step = 1; step < this.steps; step++) {
      const currentWidth = step * this.stepSize
      const currentHight = currentWidth * this.aspectRatio

      if (currentWidth <= this.width && currentWidth <= this.height) {
        await this.resize(currentWidth, currentHight)
      } else {
        if (step === 1)
          throw new Error('Изображение слишком маленького разршения')
        break
      }
    }

    return this.response
  }
}

module.exports = Sharp
