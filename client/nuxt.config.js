const { BASE_URL } = process.env

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  nuxt: {
    host: '0.0.0.0',
    port: '3000',
  },
  target: 'server',
  head: {
    title: 'Nika Dmitrieva',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'theme-color', name: 'theme-color', content: '#fff' },
      {
        hid: 'msapplication-navbutton-color',
        name: 'msapplication-navbutton-color',
        content: '#fff',
      },
      {
        hid: 'apple-mobile-web-app-status-bar-style',
        name: 'apple-mobile-web-app-status-bar-style',
        content: '#fff',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/proxy',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: `${BASE_URL}/api`,
  },

  proxy: {
    '/uploads': `${BASE_URL}/`,
    '/api': `${BASE_URL}/`,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  css: ['assets/scss/index.scss'],
  styleResources: {
    scss: ['./assets/scss/*.scss'],
  },
}
