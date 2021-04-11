import { Schema, model, Document } from 'mongoose'

export interface Series {
  _id: string
  title: string
  url: string
  description?: string
  order: number
  views: number
}

export interface SeriesDocument extends Series, Document {
  _id: string
}

const schema: Schema = new Schema(
  {
    _id: { type: String },
    title: { type: String, required: true },
    url: { type: String },
    description: { type: String },
    order: { type: Number, required: true },
    clicks: { type: Number, default: 0 },
  },
  { _id: false }
)

export default model<SeriesDocument>('Series', schema)
