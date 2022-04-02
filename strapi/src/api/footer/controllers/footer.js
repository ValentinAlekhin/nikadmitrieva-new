const {createCoreController} = require('@strapi/strapi').factories

module.exports = createCoreController('api::footer.footer', () => ({
  async find(ctx) {
    const {
      data: {attributes},
    } = await super.find(ctx)

    return attributes
  },
}))
