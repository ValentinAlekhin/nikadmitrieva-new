import axios from '../axios'

export default {
  state: {
    series: [],
    images: [],
  },
  mutations: {
    setImages: (state, payload) => (state.images = payload),
    setSeries: (state, payload) => (state.series = payload),
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
}
