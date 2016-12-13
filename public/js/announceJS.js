'use strict';
var userID;
// var userName;


$(function() {

  var $announceDiv = $('#announcementsDiv');
  $announceDiv.css({'height': 'auto'});
  $.getJSON('/announce').done((data) => {
    data.map((announce) => {
      generateAnnnouncements(announce.title, announce.content, announce.userId);
    });
  });

});

$('#addAnnounce').click(function(){
  $('#modal1').modal('open');
  // This populates the email field to provide autocomplete
  var $xhr = $.ajax({
    type: "GET",
    url: "/useremails",
    success: function(result) {
      //for each email, create a key with a null value
      var emailObj = {};
      for (var i = 0; i < result.length; i++) {
        emailObj[result[i]] = null;
      }
      $('#emailAddressAnnouncement').autocomplete({
        data: emailObj
      });
    }
  });

});

$('#submitNewAnnounce').click(function(){

  var requests = [];
  var email = $('#emailAddressAnnouncement').val();
  requests.push($.ajax({
    type: "GET",
    url: `/emails/${email}`,
    success: function(result) {
      console.log("get user by email successful");
    },
    error: function(err) {
      console.error(err);
    }
  }));
  //TODO wrap POST in promise, only POST once GET '/users/email' returns

  // console.log('newAnnounce obj- ', newAnnounce);
  // if (!newAnnounce.title) {
  //   Materialize.toast('Label your announcement!', 3000);
  // } else if (!newAnnounce.content) {
  //   Materialize.toast('Actually include an announcement!', 3000);
  // }
  // else
  // {
  Promise.all(requests).then(function(results){
    userID = parseInt(results[0].id);
    // userName = results[0].firstName;
    var newAnnounce = {
      title: $('#newAnnounceTitle').val(),
      content: $('#newAnnounceContent').val(),
      userId: userID
    };

    $.ajax({
    type: "POST",
    url: "/announce",
    data: newAnnounce,
    success: function(result) {
      console.log("post successful ", result);
      window.location.href = '../fridge.html';
    },
    error: function(err){
      console.error(err);
    }
  });
  });
    // }

});

function generateAnnnouncements(title, content, userID) {
  var $announceDiv = $('#announcementsDiv');
  var userName;
  var promises = [];
  console.log('userID- ', userID);
  promises.push(
  $.ajax({
    type: "GET",
    url: `/users/${userID}`,
    success: function(result) {
      console.log("get user by userID result- ", result);
    },
    error: function(err) {
      console.error(err);
    }
  }));
  Promise.all(promises).then(function(result){
    // console.log('promiseAll result- ', result[0]);
    userName = result[0].firstName;

    var newAnnounce = `
      <div class="row announcementRow">
        <p class="announcementP">${title}:</p>
        <p class="announcementP">${content}</p>
        <p class="announcementP">From: ${userName}</p>
        <a class="btn-floating btn-small waves-effect waves-light orange" id="deleteAnnounce"><i class="material-icons">delete</i></a>
      </div>
      <br>
    `;

    $announceDiv.append(newAnnounce);
  })
  // var Id = `#${id}`;
  //
  // $(Id).click(function() {
  //   console.log($(this).attr('id'));
  //   deleteItem($(this).attr('id'));
  // });
}
