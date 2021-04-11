import { Schema, model, Document } from 'mongoose'

export interface Image extends Document {
  _id: string
  series_id: string
  order: number
  name: string
  description?: string
  views: number
}

export interface ImageDocument extends Image, Document {
  _id: string
}

const schema: Schema = new Schema({
  _id: { type: String },
  series_id: { type: String, required: true },
  order: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String },
  views: { type: Number, default: 0 },
})

export default model<ImageDocument>('Image', schema)
