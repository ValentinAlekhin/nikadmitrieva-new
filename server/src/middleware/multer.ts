import path from 'path'
import { toString } from 'app-root-path'
import multer from 'multer'

const appRoot = toString()
const dest = path.join(appRoot, process.env.UPLOADS_DIR)

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, dest)
  },
  filename: (_, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`)
  },
})

export default multer({ storage }).single('image')
