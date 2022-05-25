const { builderKey, builderUrl } = require('./env')

module.exports = () => ({
  upload: {
    config: {
      xlarge: 1920,
    },
  },
  menus: {
    enabled: true,
    config: {
      maxDepth: 0,
    },
  },
  'website-builder': {
    enabled: true,
    config: {
      url: builderUrl,
      body: {
        key: builderKey,
      },
      trigger: {
        type: 'manual',
      },
    }
  },
  io: {
    enabled: true,
    config: {
      IOServerOptions: {
        cors: { path: '*' },
      },
      contentTypes: '*',
    },
  },
})
