const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')

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

  async createPlaceholder() {}
}

const resize = async (width, height) => {
  const webpName = `${this.fileName}_${width + settings.tags.width}.webp`
  const jpegName = `${this.fileName}_${width + settings.tags.width}.jpeg`
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

module.exports = async path => {
  const { width, height } = await sharp(path).metadata()
  const aspectRatio = width / height
}
