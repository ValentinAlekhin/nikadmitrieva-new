module.exports = {
  transpileDependencies: ['vuetify'],
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/vars.scss"',
      },
      scss: {
        prependData: '@import "@/scss/vars.scss";',
      },
    },
  },
}
