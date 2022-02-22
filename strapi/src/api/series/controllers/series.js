const {createCoreController} = require('@strapi/strapi').factories

module.exports = createCoreController('api::series.series', () => ({
  async find(ctx) {
    ctx.query = {...ctx.query, local: 'en'}

    const {data} = await super.find(ctx)

    return data.map((s) => ({
      ...s.attributes,
      id: s.id,
      images: s.attributes.images.data.map((img) => ({
        ...img.attributes,
        id: img.id,
        preview: `/api/image?id=${img.id}&width=200&ext=jpeg&blur=50`,
      })),
    }))
  },
}))
