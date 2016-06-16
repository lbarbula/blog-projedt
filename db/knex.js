var environment = process.env.NODE_ENV || 'development'
var config = ("../knexfile")[environment]
module.exports = require("knex")(config)
