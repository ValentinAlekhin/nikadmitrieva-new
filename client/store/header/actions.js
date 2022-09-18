export default {
  async getData({ commit }) {
    commit('setLoading', true)

    try {
      let { data } = await this.$axios.$get(
        'menus?nested&populate=*&populate=items.svg'
      )

      data = await data.reduce(async (previousPromise, { attributes }) => {
        const acc = await previousPromise

        acc[attributes.slug] = await Promise.all(
          attributes.items.data.map(async (item) => {
            let svg = null
            if (item?.attributes?.svg.data?.attributes?.url) {
              svg = await this.$axios.$get(
                item.attributes.svg.data.attributes.url,
                { baseURL: process.env.baseUrl }
              )
            }

            return {
              ...item.attributes,
              svg,
            }
          })
        )

        return acc
      }, Promise.resolve({}))

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
