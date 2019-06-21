const ENV = process.env.ENV || "development";

const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');


module.exports = {

  // Querying all resources from db
  resources(cb) {
    // let user = req.session.user_id;
    // let name = req.session.user_name;

    knex.select('title', 'description', 'url', 'resource_id')
      .from('resources')
    //   .asCallback(function(err, rows) {
    //     if(err) {
    //       console.log(err);
    //       cb(err);
    //     } else {
    //       console.log(rows);
    //       cb(null, rows);

    //     }
    // });
      .asCallback(cb)
  }

}

