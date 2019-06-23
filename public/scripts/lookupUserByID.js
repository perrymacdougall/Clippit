const ENV = process.env.ENV || "development";

const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

module.exports = {

  lookupUserByID(user_id, cb) {
    knex.select('id', 'email', 'password', 'name')
    .from('users')
    .where('id', '=', user_id)
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
