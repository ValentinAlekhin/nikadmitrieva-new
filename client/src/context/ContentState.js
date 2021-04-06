import { createContext, useState, useEffect } from 'react'
import axios from '../axios/index'

const BASE_URL = process.env.REACT_APP_BASE_URL

export const ContentContext = createContext({
  loading: true,
  pageNotReady: true,
  series: [],
  images: [],
  fetchAll: async () => {},
  getSeries: () => {},
  getSeriesImages: () => {},
  addImage: () => {},
  addLoadedImage: () => {},
})

ContentContext.displayName = 'ContentContext'

const ProjectsState = ({ children }) => {
  const [content, setContent] = useState({ series: [], images: [] })
  const [loading, setLoading] = useState(true)
  const [pageNotReady, setPageNotReady] = useState(true)
  const [images, setImages] = useState({ count: 0, loaded: 0 })

  const addBaseUrl = images =>
    images.map(img => {
      const placeholder = BASE_URL + img.placeholder
      const jpeg = img.jpeg.map(el => ({ ...el, src: BASE_URL + el.src }))
      const webp = img.webp.map(el => ({ ...el, src: BASE_URL + el.src }))

      return { ...img, placeholder, jpeg, webp }
    })

  const addSrcSet = images =>
    images.map(img => {
      img.webpSrcSet = img.webp
        .map(({ src, width }) => `${src} ${width}w`)
        .join(',\n')

      img.jpgSrcSet = img.jpeg
        .map(({ src, width }) => `${src} ${width}w`)
        .join(',\n')

      return img
    })

  const fetchAll = async () => {
    setLoading(true)

    try {
      const { data } = await axios.get('/')
      const { series, images } = data

      setContent({ series, images: addSrcSet(addBaseUrl(images)) })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const getSeries = () =>
    content.series.map(({ title, _id }) => {
      const titleImage = content.images.find(
        img => img.seriesId === _id && img.order === 1
      )

      return { title, _id, titleImage }
    })

  const getSeriesImages = seriesId =>
    content.images.filter(image => image.seriesId === seriesId)

  const addImage = () => setImages({ ...images, count: images.count + 1 })

  const addLoadedImage = () => {
    const { count, loaded } = images
    setImages({ ...images, loaded: loaded + 1 })
    if (count === loaded) {
      setPageNotReady(false)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchAll(), [])

  return (
    <ContentContext.Provider
      value={{
        content,
        loading,
        pageNotReady,
        getSeries,
        getSeriesImages,
        addImage,
        addLoadedImage,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export default ProjectsState
