const { Schema, Types, model } = require('mongoose')

const schema = new Schema({
  galleryId: { type: Types.ObjectId, required: true },
  webp: [
    {
      width: { type: Number },
      src: { type: String },
    },
  ],
  jpg: [
    {
      width: { type: Number },
      src: { type: String },
    },
  ],
  placeholder: { type: String },
  size: {
    width: { type: Number },
    height: { type: Number },
  },
  order: { type: Number, required: true },
  description: { type: String },
  clicks: { type: Number, default: 0 },
})

module.exports = model('Img', schema)
