export default {
  mappedItems: (state) =>
    state.items.map(({ id, attributes }) => ({
      id,
      ...attributes,
      images: attributes.images.data.map((image) => ({
        id: image.id,
        ...image.attributes,
        preview: `/api/image?id=${image.id}&width=200&ext=jpeg&blur=50`,
      })),
    })),
  sortedItems: (_, getters, __, rootGetters) => {
    const order = rootGetters['home/seriesOrder']
    const sortedSeries = order.map((id) => getters.getSeriesById(id)).filter(s => s)
    const notIncludedSeries = getters.mappedItems.filter(({ id }) => !order.find((id2) => id === id2))

    return [...sortedSeries, ...notIncludedSeries]
  },
  reducedItems: (_, getters) =>
    getters.mappedItems.reduce((acc, s) => {
      acc[s.id] = s

      return acc
    }, {}),
  getSeriesById: (_, getters) => (id) => getters.reducedItems[id],
}
