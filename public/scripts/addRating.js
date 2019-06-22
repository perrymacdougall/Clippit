const ENV = process.env.ENV || "development";

const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

module.exports = {
  addRating(ratingInfo, cb) {
  knex('ratings')
    .insert({
      rating: ratingInfo.rating,
      user_id: ratingInfo.user_id,
      resource_id: ratingInfo.resource_id
    })
    .asCallback(function(err, info){
      if(err) {
        cb(err);
      } else {
        cb(null, info);
      }
    })
  }
}
