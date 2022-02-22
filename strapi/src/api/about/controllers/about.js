const {marked} = require('marked')

const {createCoreController} = require('@strapi/strapi').factories

module.exports = createCoreController('api::about.about', () => ({
  async find(ctx) {
    const {
      data: {attributes},
    } = await super.find(ctx)

    return {
      ...attributes,
      textHtml: marked.parse(attributes.text),
    }
  },
}))
