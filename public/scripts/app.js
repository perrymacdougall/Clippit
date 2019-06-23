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
      $('#numLikes').html(parseInt($('#numLikes').text()) + 1)
    );

  });

  //jQuery call for ratings
  $('#rating').on('change', function() {
    let firstStep = window.location.pathname;
    let resource_id = firstStep.replace(/\/resources\//g, "")
    console.log("Event fired");

    $.ajax({
      method: "POST",
      url:"/ratings",
      data: { resource_id: resource_id,
              rating: $('#rating option:selected').text()
            }
    })

  })

});


