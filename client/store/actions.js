export default {
  async nuxtServerInit({ dispatch }) {
    const actions = [
      'series/getItems',
      'footer/getData',
      'navbar/getData',
      'meta/getData',
      'home/getData'
    ].map((action) => dispatch(action))
    await Promise.all(actions)
  },
}
