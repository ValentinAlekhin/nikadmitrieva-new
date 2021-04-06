module.exports = config => {
  config.module.rules.push({
    resolve: {
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
      },
    },
  })
  return config
}
