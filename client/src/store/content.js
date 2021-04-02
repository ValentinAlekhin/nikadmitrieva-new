import axios from '../axios/index'

const BASE_URL = process.env.VUE_APP_BASE_URL

export default {
  state: {
    series: [],
    images: [],
  },
  mutations: {
    setImages: (state, payload) => (state.images = payload),

    setSeries: (state, payload) => (state.series = payload),

    addBaseUrl: state =>
      (state.images = state.images.map(img => {
        const placeholder = BASE_URL + img.placeholder
        const jpeg = img.jpeg.map(el => ({ ...el, src: BASE_URL + el.src }))
        const webp = img.webp.map(el => ({ ...el, src: BASE_URL + el.src }))

        return { ...img, placeholder, jpeg, webp }
      })),
  },
  actions: {
    async fetchAllData({ commit }) {
      commit('setLoading', true)
      commit('clearError')

      try {
        const response = await axios.get('/client')
        const { series, images } = response.data

        commit('setImages', images)
        commit('setSeries', series)
        commit('addBaseUrl')
      } catch (e) {
        commit('setError', e)
      } finally {
        commit('setLoading', false)
      }
    },
  },
  getters: {
    series: state => state.series.sort((a, b) => a.order - b.order),

    images: state => state.images,

    seriesCards: state =>
      state.series.map(({ title, _id }) => {
        const titleImage = state.images.find(
          img => img.seriesId === _id && img.order === 1
        )

        return { title, _id, titleImage }
      }),

    seriesTitleImage: state => seriesId =>
      state.images.find(img => img.seriesId === seriesId && img.order === 1),

    allImagesInSeries: state => seriesId =>
      state.images.filter(image => image.seriesId === seriesId),
  },
}
