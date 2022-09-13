const path = require('path')
require('dotenv').config({path: path.join(__dirname, '../../.env')})

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  ADMIN_JWT_SECRET,
  API_TOKEN_SALT,
  BUILDER_KEY,
} = process.env

module.exports = {
  db: {
    host: DATABASE_HOST || 'localhost',
    port: DATABASE_PORT || '5333',
    name: DATABASE_NAME || 'nika',
    user: DATABASE_USERNAME || 'nika',
    password: DATABASE_PASSWORD || 'nika',
  },
  admin: {
    secret: ADMIN_JWT_SECRET || '50b5ccf75e96f16d75642b2496f22626',
    salt: API_TOKEN_SALT || 'salt',
  },
  builder: {
    key: BUILDER_KEY || '1111',
  },
}
