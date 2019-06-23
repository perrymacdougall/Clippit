const ENV = process.env.ENV || "development";

const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');


module.exports = {


    // Querying all resources from db
    resources(cb) {

      knex.raw('select r.title, r.description, r.url, r.resource_id, count(l.like_id) as numlikes from resources as r left join likes as l on r.resource_id=l.resource_id group by r.title, r.description, r.url, r.resource_id')
        .asCallback(cb)
    },


}
