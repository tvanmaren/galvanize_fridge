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

  //Click on User Icon
  // $('#checkUser').click(function() {
  //   checkUserInfo()
  // })

  $.getJSON('/foods')
    .done((data) => {
      data.map((item) => {
        generateCards(item.id, item.user_id, item.image_url, item.comments, item.category);
      });
    })
    .fail((err) => {
      console.error(err);
    });

  //Radio Button Listeners
  $('#allCat').click(function () {
    $('foodCards').empty();
    $.getJSON('/foods')
      .done((data) => {
        data.map((item) => {
          generateCards(item.id, item.user_id, item.image_url, item.comments, item.category);
        });
      })
      .fail((err) => {
        console.error(err);
      });

    //Radio Button Listeners
    $('#allCat').click(function () {
      Window.refresh();
      $.getJSON('/foods')
        .done((data) => {
          data.map((item) => {
            generateCards(item.id, item.user_id, item.image_url, item.comments, item.category);
          });
        })
        .fail((err) => {
          console.error(err);
        });
    });

    $('#personalCat').click(function () {
      $('#foodCards').empty();
      $.getJSON('/foods?catId=1')
        .done((data) => {
          data.map((item) => {
            generateCards(item.id, item.user_id, item.image_url, item.comments, item.category);
          });
        })
        .fail((err) => {
          console.error(err);
        });
    });

    $('#communityCat').click(function () {
      $('#foodCards').empty();
      $.getJSON('/foods?catId=2')
        .done((data) => {
          data.map((item) => {
            generateCards(item.id, item.user_id, item.image_url, item.comments, item.category);
          });
        })
        .fail((err) => {
          console.error(err);
        });
    });

    $('#eventCat').click(function () {
      $('#foodCards').empty();
      $.getJSON('/foods?catId=3')
        .done((data) => {
          data.map((item) => {
            return generateCards(item.id, item.user_id, item.image_url, item.comments, item.category);
          });
        })
        .fail((err) => {
          console.error(err);
        });
    });
    //End Radio Button Listeners

    // LOGOUT
    $('.logout').click(function () {
      logout();
    });
  });
});

// function checkUserInfo() {
//   var $xhr = $.ajax({
//     type: "GET",
//     url: "/users",
//     success: function (result) {
//       $('#nameGoesHere').text(result[0].firstName);
//       $('#contentHere').text(result[0].email);
//       console.log("GET successful ", result);
//     }
//   });
//
//   $xhr.fail((err) => {
//     console.error(err);
//   });
// }

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

///////////////////////////////////////////////////////////////////////

function checkFridgeStats() {
  $.getJSON("/users")
    .then((userList) => {
      userList.forEach((user) => {
        $.getJSON(`/foods/${user.id}/`)
          .then((result) => {
            if (result.length>0) {
              $('#content').html(`${$('#content').html()} <p> <u>${user.firstName} ${user.lastName}</u>: ${result.length} item(s) in the fridge.`);
            }
            },
            (err) => {
              console.error(err);
            });
      });
    });

  $.getJSON("/foods")
    .then((result) => {
      //TODO add user data (items per user) & expiration data
      console.log(result);
      $('#content').html(`${$('#content').html()} <p> Fridge items to date: ${result.length}`);
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
