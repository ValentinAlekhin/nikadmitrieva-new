const {createCoreController} = require('@strapi/strapi').factories

module.exports = createCoreController('api::home.home', () => ({
  async find(ctx) {
    const {
      data: {attributes},
    } = await super.find(ctx)

    return attributes
  },
}))
