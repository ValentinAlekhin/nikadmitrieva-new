import { Schema, model, Document } from 'mongoose'

export interface Image extends Document {
  series_id: string
  order: number
  name: string
  description?: string
  views: number
}

const schema = new Schema({
  series_id: { type: String, required: true },
  order: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String },
  views: { type: Number, default: 0 },
})

export default model<Image>('Image', schema)
