export default {
  async getData({ commit }) {
    commit('setLoading', true)

    try {
      const {
        data: { attributes },
      } = await this.$axios.$get('header')
      commit('setData', attributes)
    } catch (e) {
      commit('setError', e)
    } finally {
      commit('setLoading', false)
    }
  },
}
