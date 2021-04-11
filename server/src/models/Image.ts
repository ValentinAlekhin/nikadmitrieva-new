import { Schema, model, Document } from 'mongoose'

export interface Image {
  _id: string
  series_id: string
  order: number
  views: number
  description?: string
}

export interface ImageDocument extends Image, Document {
  _id: string
}

const schema: Schema = new Schema({
  _id: { type: String },
  series_id: { type: String, required: true },
  order: { type: Number, required: true },
  description: { type: String },
  views: { type: Number, default: 0 },
})

export default model<ImageDocument>('Image', schema)
