const ENV = process.env.ENV || "development";

const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

module.exports = {
  updateUser(userInfo, cb) {
    knex('users')
    .where('id','=', userInfo.user_id)
    .update({
      name: userInfo.name,
      password: userInfo.password,
      email: userInfo.email
    })
    .asCallback(function(err, info){
      if(err) {
        console.log(err);
        cb(err);
      } else {
        console.log("Info output update query", info);
        cb(null, info);
      }
    })
  }
}


