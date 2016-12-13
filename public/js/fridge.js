'use strict';

$(function () {

  // Click on Admin Icon
  $('#settings').click(function () {
    checkFridgeStats();
  });

  var $foodDiv = $('#foodCards');

  $foodDiv.css({
    'height': '800px'
  });

  // start by populating food cards of all types
  $.getJSON('/foods').done((data) => {
    data.map((item) => {
      generateCards(item.id, item.user_id, item.image_url, item.comments, item.category);
    });
  });

  //Radio Button Listeners
  $('#allCat').click(function () {
    // window.location.reload();
    $('#foodCards').empty();
    $.getJSON('/foods').done((data) => {
      data.map((item) => {
        generateCards(item.id, item.user_id, item.image_url, item.comments, item.category);
      });
    });
  });

  $('#personalCat').click(function () {
    $('#foodCards').empty();
    $.getJSON('/foods/personal').done((data) => {
      data.map((item) => {
        generateCards(item.id, item.user_id, item.image_url, item.comments, item.category);
      });
    });
  });

  $('#communityCat').click(function () {
    $('#foodCards').empty();
    $.getJSON('/foods/community').done((data) => {
      data.map((item) => {
        generateCards(item.id, item.user_id, item.image_url, item.comments, item.category);
      });
    });
  });

  $('#eventCat').click(function () {
    $('#foodCards').empty();
    $.getJSON('/foods/event').done((data) => {
      data.map((item) => {
        return generateCards(item.id, item.user_id, item.image_url, item.comments, item.category);
      });
    });
  });
  //End Radio Button Listeners

  // LOGOUT
  $('.logout').click(function () {
    logout();
  });
});

function generateCards(id, user_id, image_url, comments, category) {
  var $foodDiv = $('#foodCards');
  var categoryName = setCategory(category);

  var newCard = `
        <div class="col s4">
          <div class="card">
            <div class="card-image">
              <img src="${image_url}">
            </div>
            <div class="card-content">
              <p>${comments}</p>
            </div>
            <div class="card-action">
              <a><i class="delete-food material-icons food-action" id="${id}">delete</i></a>
              <a><i class="material-icons food-action" value="${id}">create</i></a>
              <span class="new badge orange">${categoryName}</span>
            </div>
          </div>
        </div>
`;

  $foodDiv.append(newCard);

  var Id = `#${id}`;

  $(Id).click(function () {
    console.log($(this).attr('id'));
    deleteItem($(this).attr('id'));
  });
}

function setCategory(catID) {
  switch (catID) {
  case 1:
    return 'Personal';
    break;
  case 2:
    return 'Community';
    break;
  case 3:
    return 'Event';
    break;
  default:
    return 'Personal';
    break;
  }
}

function deleteItem(id) {
  $.ajax({
    url: `/foods/${id}`,
    type: "DELETE",
    success: function (result) {
      location.reload();
      console.log("Delete successful " + result);
    }
  });
}

// function getFoodsById(id, firstName, lastName) {
//   let name = `${firstName} ${lastName}`;
//   console.log('getting Foods matching user', id, name);
//   return $.getJSON(`/foods?userId=${id}`) // this appears to be bugging out because of the foods routes
//     .done((result) => {
//       console.log(name, result);
//       return $('#content').append(`<p>${name} has ${result.length} items in the fridge.`);
//     })
//     .fail((err) => {
//       return console.error(err);
//     });
// }

function checkFridgeStats() {
  let $content=$('#content');

  $content.empty();
  // $.getJSON("/users")
  //   .done((userList) => {
  //     userList.map((user) => {
  //       return getFoodsById(user.id, user.firstName, user.lastName);
  //     });
  //   });

  $.getJSON("/foods")
    .then((result) => {
      console.log(result);
      //TODO add user data (items per user) & expiration data
      $content.append(`<p> Fridge items to date: ${result.length}`);
      // result.forEach((item) => {
      //   $content.append(`
      //     <div class="chip">
      //       <img src="${item.image_url}" alt="${item.comments}">
      //       ${new Date(parseInt(item.expiration))}
      //     </div>
      //     `);
      // });
    }, (err) => {
      console.error(err);
    });
}

function logout() {
  var $xhr = $.ajax({
    type: "DELETE",
    url: "/token",
    success: function (result) {
      console.log("DELETE /token successful ", result);
    }
  });

  $xhr.fail((err) => {
    console.error(err);
  });
}
