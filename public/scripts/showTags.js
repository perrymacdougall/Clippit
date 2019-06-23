const ENV = process.env.ENV || "development";

const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

module.exports = {

  // show the tags for the selected resource
  showTags(cb) {
    knex.select('tag', 'resource_id')
    .from('tags')
    .asCallback(function(err, rows){
      if(err) {
        console.log(err);
        cb(err);
      } else {
        // return an object with all the tags for each resource
        let tagList = {};
        for (let row in rows) {

          if(tagList[rows[row].resource_id]) {
            // separate multiple tags with commas
            tagList[rows[row].resource_id] = tagList[rows[row].resource_id] + ', ' + rows[row].tag ;
          } else {
            tagList[rows[row].resource_id] = rows[row].tag;
          }
        }
        cb(null, tagList);
      }
    })
  }

}
