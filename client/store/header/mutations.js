export default {
  setData(state, payload) {
    state.data = payload
  },
  setDrawer(state, payload) {
    console.log('setDrawer', payload)
    state.drawer = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setError(state, payload) {
    state.error = payload
  },
}
