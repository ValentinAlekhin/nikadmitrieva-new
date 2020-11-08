const path = require('path')
const appRoot = require('app-root-path').toString()
const multer = require('multer')

const dest = path.join(appRoot, process.env.UPLOADS_DIR)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dest)
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`)
  },
})

module.exports = multer({ storage }).single('image')
