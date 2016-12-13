'use strict';
var userID;
var userName;


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

  //TODO GET req. w/ email passed into url, returns user name to add to
  
  var email = $('#emailAddressAnnouncement').val();
  var $xhr = $.ajax({
    type: "GET",
    url: `/users/${email}`,
    data: newAnnounce,
    success: function(result) {
      console.log("get user by email successful");
      userName = result.firstName;
      userID = result.id;
      console.log(userName, 'id: ', userID);

      // window.location.href = '../fridge.html';
    }
  });

  //TODO wrap POST in promise, only POST once GET '/users/email' returns

  $xhr.fail((err) => {
    console.error(err);
  });


  var newAnnounce = {
    title: $('#newAnnounceTitle').val(),
    content: $('#newAnnounceContent').val(),
    userId: userID
  };
  console.log('newAnnounce obj- ', newAnnounce);
  if (!newAnnounce.title) {
    Materialize.toast('Label your announcement!', 3000);
  } else if (!newAnnounce.content) {
    Materialize.toast('Actually include an announcement!', 3000);
  } else {
    var $xhr = $.ajax({
      type: "POST",
      url: "/announce",
      data: newAnnounce,
      success: function(result) {
        console.log("post successful ", result);
        window.location.href = '../fridge.html';
      }
    });

    $xhr.fail((err) => {
      console.error(err);
    });
  }
});

function generateAnnnouncements(title, content, userId) {
  var $announceDiv = $('#announcementsDiv');

  var newAnnounce = `
    <div class="row announcementRow">
      <p class="announcementP">${title}:</p>
      <p class="announcementP">${content}</p>
      <p class="announcementP">From: ${userId}</p>
      <a class="btn-floating btn-small waves-effect waves-light orange" id="deleteAnnounce"><i class="material-icons">delete</i></a>
    </div>
    <br>
  `;

  $announceDiv.append(newAnnounce);
  // var Id = `#${id}`;
  //
  // $(Id).click(function() {
  //   console.log($(this).attr('id'));
  //   deleteItem($(this).attr('id'));
  // });
}
