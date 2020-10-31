const { Schema, Types, model } = require('mongoose')

const schema = new Schema({
  galleryId: { type: Types.ObjectId, required: true },
  webp: [
    {
      width: { type: Number, required: true },
      src: { type: String, required: true },
    },
  ],
  jpg: [
    {
      width: { type: Number },
      src: { type: String },
    },
  ],
  placeholder: { type: String, required: true },
  size: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  order: { type: Number, required: true },
  description: { type: String },
})

module.exports = model('Img', schema)
