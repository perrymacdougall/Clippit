// const ENV = process.env.ENV || "development";

// const knexConfig = require("../../knexfile");
// const knex = require("knex")(knexConfig[ENV]);
// const morgan = require('morgan');
// const knexLogger = require('knex-logger');

// const dblikeFunction = require('./public/scripts/likeFunction.js');

$(document).ready(function() {

  //jQuery call for like button
  $('.fa-heart').on('click', function(event) {
    event.preventDefault();
    let firstStep = window.location.pathname;
    let resource_id = firstStep.replace(/\/resources\//g, "")

    $.ajax({
      method: "POST",
      url: "/likes",
      data: { resource_id: resource_id }
    }).done(
      console.log('I have sent a like to the db')
    );

    // $.post('/likes', { resource_id }),
    //   function(result){
    //     console.log("Success");
    //   }

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
