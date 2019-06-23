const ENV = process.env.ENV || "development";

const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

module.exports = {

  countLikes(resource_id, cb) {
    knex('likes')
      .count('like_id')
      .where('resource_id', '=', resource_id)
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
