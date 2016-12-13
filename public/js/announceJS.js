'use strict';
var userID;
var title;
var content;
// var userName;


$(function() {


  var $announceDiv = $('#announcementsDiv');
  $announceDiv.css({'height': 'auto'});
  $.getJSON('/announce').done((data) => {
    console.log('announce data-', data);
    // var sortedData = sortByKey(data, 'id');
    generateAnnnouncements(data);
    // });
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

  Promise.all(requests).then(function(results){
    userID = parseInt(results[0].id);
    // userName = results[0].firstName;
    var newAnnounce = {
      title: $('#newAnnounceTitle').val(),
      content: $('#newAnnounceContent').val(),
      userId: userID
    };
    if (!newAnnounce.title) {
      Materialize.toast('Label your announcement!', 3000);
    } else if (!newAnnounce.content) {
      Materialize.toast('Actually include an announcement!', 3000);
    }
    else{
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
    }
  });

});

//param for generateAnnnouncements = data?
function generateAnnnouncements(data) {
  // data = GET result off all announcements
  var appendObj = {};
  var promises = [];
  // var dataTop = data.length - 1;
  var dataBottom = data.length - 3;
  var sortedData = sortByKey(data, 'id');
  for(var i=dataBottom; i<data.length; i++){
    userID = sortedData[i].userId;
    appendObj[i] = {
      title: sortedData[i].title,
      content: sortedData[i].content
    };
    console.log('userID- ', userID);
    promises.push(
    $.ajax({
      type: "GET",
      url: `/users/${userID}`,
      success: function(result) {
        console.log("get user by userID successful");
      },
      error: function(err) {
        console.error(err);
      }
    }));
  }
  // var userName;

  Promise.all(promises).then(function(result){
    console.log('promiseAll result- ', result);
    console.log('appendObj- ', appendObj);
    for(var i=0; i<3; i++){
      var key = i+1;
      appendObj[key].name = result[i].firstName;
    }
    console.log('appendObj after loop- ', appendObj);
    // result = array of user data objects
    appendAnnounce(appendObj);
  });
}

function appendAnnounce(obj){
  var $announceDiv = $('#announcementsDiv');
  for (var key in obj){
    var title = obj[key].title;
    var content = obj[key].content;
    var name = obj[key].name;

    var newAnnounce = `
    <div class="row announcementRow">
    <p class="announcementP">${title}:</p>
    <p class="announcementP">${content}</p>
    <p class="announcementP">From: ${name}</p>
    <a class="btn-floating btn-small waves-effect waves-light orange" id="deleteAnnounce"><i class="material-icons">delete</i></a>
    </div>
    <br>
    `;

    $announceDiv.prepend(newAnnounce);

  }


}

function sortByKey(array, key) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}
