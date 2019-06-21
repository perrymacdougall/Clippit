const ENV = process.env.ENV || "development";

const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

const dblikeFunction = require('./public/scripts/likeFunction.js');

$(document).ready(function() {

  //jQuery call for like button
  $('.like-icon').on('click', function() {
    console.log('I have been clicked!');
    likeFunction();
  });

});











// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });
