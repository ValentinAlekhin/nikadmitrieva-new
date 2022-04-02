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
      url: 'https://link-to-hit-on-trigger.com',
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
