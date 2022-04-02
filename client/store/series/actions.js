export default {
  async getItems({ commit }) {
    commit('setLoading', true)

    try {
      const data = await this.$axios.$get('seriess?populate=images')
      commit('setItems', data)
    } catch (e) {
      commit('setError', e)
    } finally {
      commit('setLoading', false)
    }
  },
}
