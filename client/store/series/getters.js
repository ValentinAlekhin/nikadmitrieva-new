export default {
  sortedItems: (state, getters, __, rootGetters) => {
    const order = rootGetters['home/seriesOrder']
    const sortedSeries = order
      .map((id) => getters.getSeriesById(id))
      .filter((s) => s)
    const notIncludedSeries = state.items.filter(
      ({ id }) => !order.find((id2) => id === id2)
    )

    return [...sortedSeries, ...notIncludedSeries]
  },
  reducedItems: (state) =>
    state.items.reduce((acc, s) => {
      acc[s.id] = s

      return acc
    }, {}),
  getSeriesById: (_, getters) => (id) => getters.reducedItems[id],
}
