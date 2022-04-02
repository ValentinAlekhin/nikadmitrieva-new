export default {
  async nuxtServerInit({ dispatch }) {
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
