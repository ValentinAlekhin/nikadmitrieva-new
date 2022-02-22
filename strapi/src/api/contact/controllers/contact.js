const {createCoreController} = require('@strapi/strapi').factories

module.exports = createCoreController('api::contact.contact', () => ({
  async find(ctx) {
    const {
      data: {attributes},
    } = await super.find(ctx)

    return attributes
  },
}))
