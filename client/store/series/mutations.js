export default {
  setItems(state, payload) {
    state.items = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
}
