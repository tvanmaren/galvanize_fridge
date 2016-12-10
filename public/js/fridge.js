'use strict';

$(function() {
  var $foodDiv = $('#foodCards');

  $foodDiv.css({'height': '800px'});

  $.getJSON('http://localhost:8000/foods/active').done((data) => {
    data.map((item) => {
      generateCard(item.user_id, item.image_url, item.comments, item.category);
    });
  });

  $foodDiv.append(newCard);
});

function generateCard(user_id, image_url, comments, category) {
  var $foodDiv = $('#foodCards');

  var newCard = `<div class="col s4"><div class="card-panel teal"><span class="white-text">${user_id} ${comments} ${category}</span></div></div>`;

  $foodDiv.append(newCard)
}
