const ENV = process.env.ENV || "development";

const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

module.exports = {
  addComment(commentInfo, cb) {
  knex('comments')
    .insert({
      comment: commentInfo.comment,
      user_id: commentInfo.user_id,
      resource_id: commentInfo.resource_id
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
