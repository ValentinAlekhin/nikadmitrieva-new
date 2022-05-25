const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') })

const { BUILDER_KEY, BUILDER_URL } = process.env

module.exports = {
  builderKey: BUILDER_KEY,
  builderUrl: BUILDER_URL,
}
