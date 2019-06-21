const ENV = process.env.ENV || "development";

const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

module.exports = {
 singleResource(id, cb) {
      knex.select('title', 'description', 'url', 'resource_id')
          .from('resources')
          .where('resource_id', '=', id)
          .asCallback(cb)
  }
}
