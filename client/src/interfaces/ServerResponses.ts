export interface Image {
  _id: string
  series_id: string
  order: number
  views: number
  jpg: string
  webp: string
  placeholder: string
  description?: string
}

export interface Series {
  _id: string
  title: string
  url: string
  description?: string
  order: number
  views: number
  titleImage: Image
}

export interface RootResponse {
  images: Image[]
  series: Series[]
}
