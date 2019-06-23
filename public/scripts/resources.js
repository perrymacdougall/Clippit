const ENV = process.env.ENV || "development";

const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');


module.exports = {

  // return all resources
  resources(cb) {
    knex.raw('SELECT r.title, r.description, r.url, r.resource_id, COUNT(l.like_id) AS numlikes, ROUND(avg(coalesce(rt.rating,0)),1) AS avgrating FROM ratings AS rt RIGHT JOIN resources AS r ON rt.resource_id = r.resource_id LEFT JOIN likes AS l ON r.resource_id=l.resource_id GROUP BY r.title, r.description, r.url, r.resource_id ORDER BY r.title')
      .asCallback(cb)
  },

}
