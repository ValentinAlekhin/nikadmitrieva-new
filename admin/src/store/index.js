import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import series from './series'
import axios from '../axios'

Vue.use(Vuex)

export default new Vuex.Store({
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
        const response = await axios.get('/api/ceilnt')
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
  modules: { user, shared, series },
})
