module.exports = ({ env }) => ({
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
      url: 'http://127.0.0.1:3001/build',
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
