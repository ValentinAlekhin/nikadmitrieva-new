export default {
  async getData({ commit }) {
    commit('setLoading', true)

    try {
      const data = await this.$axios.$get('/about')
      commit('setData', data)
    } catch (e) {
      commit('setError', e)
    } finally {
      commit('setLoading', false)
    }
  },
}
