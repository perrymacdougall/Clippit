const ENV = process.env.ENV || "development";

const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

module.exports = {

  fetchComments(resource_id, cb) {
    knex('comments AS c')
      .leftJoin('users AS u', 'c.user_id', '=', 'u.id')
      .where('resource_id', '=', resource_id)
      .orderBy('comment_id', 'desc')
      .asCallback(cb)
  }

}
