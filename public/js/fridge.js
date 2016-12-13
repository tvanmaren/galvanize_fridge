'use strict';

$(function() {

    let admin;

    //check if I'm an admin, and assign that to a global
    $.getJSON('/users/self/')
        .done((user) => {
            admin = user.isAdmin;
        })
        .fail((err) => {
            console.error(err);
        });

    // Click on Settings Icon
    $('#settings').click(function() {
        if (admin) {
            checkFridgeStats();
        } else {
            checkUserInfo();
        }
    });

    var foodsJSON;
    //generate cards on page load
    $.getJSON('/foods')
        .done((data) => {
            foodsJSON = data;
            generateCards(data);
        })
        .fail((err) => {
            console.error(err);
        });

    //Radio Button Listeners (Sorting fridge cards);
    $('#allCat').click(function() {
        $('#foodCards').empty();
        generateCards(foodsJSON);
    });

    $('#personalCat').click(function() {
        $('#foodCards').empty();
        generateCards(foodsJSON.filter((obj) => {
            return obj.category === 1;
        }));
    });

    $('#communityCat').click(function() {
        $('#foodCards').empty();
        generateCards(foodsJSON.filter((obj) => {
            return obj.category === 2;
        }));
    });

    $('#eventCat').click(function() {
        $('#foodCards').empty();
        generateCards(foodsJSON.filter((obj) => {
            return obj.category === 3;
        }));
    });

    // LOGOUT
    $('.logout').click(function() {
        logout();
    });
});

function generateCards(jsonObject) {
    var $foodDiv = $('#foodCards');

    jsonObject.map((obj) => {
        var categoryName = setCategory(obj.category);

        var newCard = `
      <div class="col s12 m6 l4">
      <div class="card">
      <div class="card-image">
      <img src="${obj.image_url}">
      </div>
      <div class="card-content">
      <p>${obj.comments}</p>
      </div>
      <div class="card-action">
      <a><i class="delete-food material-icons food-action" id="${obj.id}">delete</i></a>
      <a><i class="material-icons food-action" value="${obj.id}">create</i></a>
      <span class="new badge orange">${categoryName}</span>
      </div>
      </div>
      </div>
      `;

        $foodDiv.append(newCard);

        var Id = `#${obj.id}`;

        $(Id).click(function() {
            console.log($(this).attr('id'));
            deleteItem($(this).attr('id'));
        });
    });
}

function setCategory(catID) {
    switch (catID) {
        case 1:
            return 'Personal';
        case 2:
            return 'Community';
        case 3:
            return 'Event';
        default:
            return 'Personal';
    }
}

function deleteItem(id) {
    $.ajax({
        url: `/foods/${id}`,
        type: "DELETE",
        success: function(result) {
            location.reload();
            console.log("Delete successful " + result);
        }
    });
}

function checkFridgeStats() {
  $('#name').text(`Fridge History`);
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
    }

    $.getJSON("/foods")
        .then((result) => {
            //TODO add user data (items per user) & expiration data
            console.log(result);
            $('#content').html(`${$('#content').html()} <p> Fridge items to date: ${result.length}`);
        }, (err) => {
            console.error(err);
        });
}

function checkUserInfo() {
    var $xhr = $.ajax({
        type: "GET",
        url: "/users/self/",
        success: function(result) {
            $('#name').text(`${result.firstName} ${result.lastName}`);
            $('#content').text(`Email: ${result.email}`);
            $('#content').append(`<p> User ID: ${result.id}`);
            console.log("GET successful ", result);
        }
    });

    $xhr.fail((err) => {
        console.error(err);
    });
}

function logout() {
    var $xhr = $.ajax({
        type: "DELETE",
        url: "/token",
        success: function(result) {
            console.log("DELETE /token successful ", result);
        }
    });

    $xhr.fail((err) => {
        console.error(err);
    });
}
