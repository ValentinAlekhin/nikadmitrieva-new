const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  title: { type: String, required: true },
  img: { type: Types.ObjectId, required: true },
  route: { type: String },
  description: { type: String },
  order: { type: Number, required: true },
  clicks: { type: Number, default: 0 },
})

module.exports = model('Series', schema)
