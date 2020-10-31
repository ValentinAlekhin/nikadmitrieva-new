const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  title: { type: String, required: true },
  img: { type: Types.ObjectId, required: true },
  route: { type: String },
  description: { type: String },
  order: { type: Number, required: true },
})

module.exports = model('Series', schema)
