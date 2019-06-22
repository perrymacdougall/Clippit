const ENV = process.env.ENV || "development";

const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

module.exports = {
 likeFunction(info, cb) {
      console.log('test');
      knex('likes').insert({
                      user_id: info.user_id,
                      resource_id: info.resource_id
                    })
                   .asCallback(function(err, rows) {
                      if(err) {
                        console.log(err);
                        cb(err);
                      } else {
                        console.log(rows);
                        cb(null, rows);

                      }
    })

  }
}
