const env = require('./env')

module.exports = () => ({
  auth: {
    secret: env.admin.secret,
  },
  apiToken: {
    salt: env.admin.salt,
  },
})
