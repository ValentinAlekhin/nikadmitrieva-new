const env = require('./env')

module.exports = () => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env.db.host,
      port: env.db.port,
      database: env.db.name,
      user: env.db.user,
      password: env.db.password,
    },
    debug: false,
  },
})
