const ENV = process.env.ENV || "development";

const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

module.exports = {
  searchResources(str, cb) {
    knex.select('t.tag',  'r.resource_id', 'r.title', 'r.description', 'r.url')
      .from('resources AS r')
      .leftJoin('tags AS t', 't.resource_id', '=', 'r.resource_id')
      .where('r.title', 'ilike', '%'+str+'%')
        .orWhere('r.description', 'ilike', '%'+str+'%')
        .orWhere('t.tag', 'ilike', '%'+str+'%')
      .asCallback(function(err, rows){
        if(err) {
          console.log(err);
          cb(err);
        } else {
          cb(null, rows);
        }
      })
  }
}


