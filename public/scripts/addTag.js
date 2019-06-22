const ENV = process.env.ENV || "development";

const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

module.exports = {
  addTag(tagInfo, cb) {
  knex('tags')
    .insert({
      tag: tagInfo.tag,
      resource_id: tagInfo.resource_id
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