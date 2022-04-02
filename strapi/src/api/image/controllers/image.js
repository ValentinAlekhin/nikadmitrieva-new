const fs = require('fs')
const path = require('path')

const sharp = require('sharp')
const mime = require('mime-types')
const appRootDir = require('app-root-dir')

const rootDir = appRootDir.get()

const uploadsDir = path.join(rootDir, 'public', 'uploads')
const tmpDir = path.join(rootDir, '.cache', 'images')

const findClosest = (num, arr) =>
  arr.reduce((prev, curr) =>
    Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev,
  )

const widths = Array(20)
  .fill('')
  .map((_, i) => (i + 1) * 100)

const getImageName = ({ext, blur, width, height, id}) =>
  `${id}_w${width}_h${height}_b${blur}.${ext}`

const fileExist = (filePath) =>
  fs.promises
    .access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)

module.exports = {
  index: async (ctx) => {
    const {id} = ctx.query

    try {
      const targetImage = await strapi.plugins.upload.services.upload.findOne(
        id,
      )
      if (!targetImage) {
        return (ctx.status = 404)
      }

      const {
        hash,
        ext: imageExt,
        height: imageHeight,
        width: imageWidth,
      } = targetImage

      const query = {
        ext: 'jpeg',
        ...ctx.query,
      }
      query.width = query.width
        ? findClosest(Number(query.width), widths)
        : imageWidth
      query.blur = query.blur ? Number(query.blur) : 0
      const {width, ext, blur} = query

      const height = Math.round(width / (imageWidth / imageHeight))
      const imageName = getImageName({...query, height})
      const imagePath = path.join(tmpDir, imageName)
      const originalPath = path.join(uploadsDir, `${hash}${imageExt}`)

      const imageExist = await fileExist(imagePath)
      if (!imageExist) {
        const sharpInstance = sharp(originalPath).withMetadata()
        if (width !== imageWidth) {
          sharpInstance.resize({width, height})
        }

        if (blur) {
          sharpInstance.blur(blur)
        }

        if (ext === 'webp') {
          sharpInstance.webp()
        } else if (ext === 'avif') {
          sharpInstance.avif({quality: 60})
        } else {
          sharpInstance.jpeg()
        }

        await sharpInstance.toFile(imagePath)
      }

      const mimeType = mime.lookup(imagePath)
      const src = fs.createReadStream(imagePath)

      ctx.response.set('content-type', mimeType)
      ctx.body = src
    } catch (e) {
      console.log(e)
      ctx.status = 500
      ctx.body = e.message
    }
  },
}
