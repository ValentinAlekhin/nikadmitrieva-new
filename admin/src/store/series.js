export default {
  state: {
    title: '',
    url: '',
    description: '',
    files: [],
  },

  mutations: {
    setSeriesTitle(state, payload) {
      state.title = payload
    },

    setSeriesUrl(state, payload) {
      state.url = payload
    },

    setSeriesDescription(state, payload) {
      state.description = payload
    },

    setSeriesFiles(state, payload) {
      state.files = payload.map(file => {
        file.show = false
        return file
      })
    },

    setSeriesFileDescription(state, { index, description }) {
      state.files[index].description = description
    },

    setSeriesFileShow(state, { index, show }) {
      state.files[index].show = show
    },

    removeSeriesFile(state, payload) {
      state.files.splice(payload, 1)
    },

    changeSeriesFileOrder(state, { index, order }) {
      const file = state.files.splice(index, 1)
      state.files.splice(order - 1, 0, ...file)
    },
  },

  getters: {
    seriesSelectItems(state) {
      return state.files.map((el, i) => i + 1)
    },
  },
}
