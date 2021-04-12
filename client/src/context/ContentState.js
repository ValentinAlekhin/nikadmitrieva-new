import { createContext, useState, useEffect } from 'react'
import axios from '../axios/index'

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

  const fetchAll = async () => {
    setLoading(true)

    try {
      const { data } = await axios.get('/')
      const { series, images } = data

      setContent({ series, images: images })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const getSeriesImages = seriesId =>
    content.images.filter(image => image.series_id === seriesId)

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
        series: content.series,
        loading,
        pageNotReady,
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
