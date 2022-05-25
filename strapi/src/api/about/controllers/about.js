const {marked} = require('marked')

const {createCoreController} = require('@strapi/strapi').factories

module.exports = createCoreController('api::about.about', () => ({
  async find(ctx) {
    const {
      data: {attributes},
    } = await super.find(ctx)

    const image = attributes.image.data

    return {
      ...attributes,
      image: {
        ...image.attributes,
        id: image.id,
        preview: `/api/image?id=${image.id}&width=200&ext=jpeg&blur=50`,
      },
      textHtml: marked.parse(attributes.text),
    }
  },
}))
