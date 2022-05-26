module.exports = () => ({
  upload: {
    config: {
      xxl: 2000,
      xl: 1600,
      l: 1200,
      m: 800,
      sm: 400,
    },
  },
  menus: {
    enabled: true,
    config: {
      maxDepth: 0,
      layouts: {
        menuItem: {
          image: [
            {
              input: {
                label: 'SVG',
                value: 'svg',
                name: 'svg',
                type: 'string',
              },
            },
            {
              input: {
                label: 'Scale',
                value: 'scale',
                name: 'scale',
                type: 'string',
              },
            },
          ],
          description: [
            {
              input: {
                label: 'Description',
                value: 'description',
                name: 'description',
                type: 'string',
              },
            },
          ],
        },
      },
    },
  },
})
