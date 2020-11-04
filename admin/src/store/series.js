export default {
  state: {
    title: '',
    url: '',
    description: '',
    images: [],
  },

  mutations: {
    setSeriesTitle(state, payload) {
      state.title = payload
    },

    setSeriesUrl(state, payload) {
      state.url = payload
    },

    setSeriesDescription(state, payload) {
      state.description = payload
    },

    setSeriesImages(state, payload) {
      state.images = payload.map(file => ({
        file,
        show: false,
        valid: true,
        src: URL.createObjectURL(file),
      }))
    },

    setSeriesImageDescription(state, { index, description }) {
      const images = [...state.images]
      images[index].description = description
      state.images = images
    },

    setSeriesImageShow(state, { index, show }) {
      const images = [...state.images]
      images[index].show = show
      state.images = images
    },

    setSeriesImageValid(state, { index, valid }) {
      const images = [...state.images]
      images[index].valid = valid
      state.images = images
    },

    removeSeriesImage(state, payload) {
      state.images.splice(payload, 1)
    },

    changeSeriesImageOrder(state, { index, order }) {
      const file = state.images.splice(index, 1)
      state.images.splice(order - 1, 0, ...file)
    },
  },

  getters: {
    seriesSelectItems: state => state.images.map((el, i) => i + 1),

    seriesImageDescription: state => index =>
      state.images[index].description || '',

    seriesInputFiles: state => state.images.map(image => image.file),

    seriesImagesSrc: state => index => state.images[index].src,

    seriesImageDescription: state => index => state.images[index].description,

    seriesImageShow: state => index => state.images[index].show,

    isImagesInvalid: state => {
      const images = state.images
      if (images.length) {
        for (const image of images) {
          if (!image.valid) {
            return true
          }
        }
        return false
      } else return true
    },
  },
}
