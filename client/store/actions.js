export default {
  async nuxtServerInit({ dispatch }) {
    console.info(`BASE URL: ${this.$axios.defaults.baseURL}`)
    const actions = [
      'series/getItems',
      'footer/getData',
      'header/getData',
      'meta/getData',
      'home/getData',
      'about/getData',
    ].map((action) => dispatch(action))
    await Promise.all(actions)
  },
}
