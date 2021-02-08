require('dotenv').config()

const path = require('path')
const fs = require('fs-extra')
const appRoot = require('app-root-path').toString()

module.exports = async images => {
  for (const { placeholder, jpeg, webp } of images) {
    await fs.remove(path.join(appRoot, placeholder))

    for (const { src } of jpeg) {
      await fs.remove(path.join(appRoot, src))
    }
    for (const { src } of webp) {
      await fs.remove(path.join(appRoot, src))
    }
  }
  try {
  } catch (e) {
    throw new Error(e)
  }
}
