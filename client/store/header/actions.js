export default {
  async getData({ commit }) {
    commit('setLoading', true)

    try {
      const { menus } = await this.$axios.$get('menus')

      const data = menus.reduce((acc, list) => {
        acc[list.slug] = list.items

        return acc
      }, {})

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
