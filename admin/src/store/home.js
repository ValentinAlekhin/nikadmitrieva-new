import axios from '../axios'

export default {
  state: {
    series: [],
    images: [],
  },
  mutations: {
    setImages: (state, payload) => (state.images = payload),
    setSeries: (state, payload) => (state.series = payload),
    deleteSeries: (state, seriesId) =>
      (state.series = state.series.filter(series => series._id !== seriesId)),
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
    allImagesInSeries: state => seriesId =>
      state.images.filter(image => image.seriesId === seriesId),
    titleImage: state => seriesId =>
      state.images.find(
        image => image.seriesId === seriesId && image.order === 1
      ).jpeg[0].src,
  },
}
