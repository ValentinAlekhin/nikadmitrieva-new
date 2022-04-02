export default {
  async getData({ commit }) {
    commit('setLoading', true)

    try {
      const data = await this.$axios.$get('header')
      console.log(data)
      commit('setData', data)
    } catch (e) {
      commit('setError', e)
    } finally {
      commit('setLoading', false)
    }
  },
  toggleDrawer({ state, commit }) {
    commit('setDrawer', !state.drawer)
  },
}
