import { Schema, model, Document } from 'mongoose'

export interface Series extends Document {
  title: string
  url: string
  description?: string
  order: number
  views: number
}

const schema = new Schema({
  title: { type: String, required: true },
  url: { type: String },
  description: { type: String },
  order: { type: Number, required: true },
  clicks: { type: Number, default: 0 },
})

export default model('Series', schema)
