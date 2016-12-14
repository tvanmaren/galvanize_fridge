'use strict';
var userID;
// var userName;


$(function() {


  var $announceDiv = $('#announcementsDiv');
  $announceDiv.css({'height': 'auto'});
  $.getJSON('/announce').done((data) => {
    generateAnnnouncements(data);
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
    url: `/users?email=${email}`,
    success: function() {
      console.log("get user by email successful");
    },
    error: function(err) {
      console.error(err);
    }
  }));

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
          window.location.href = '../announce.html';
        },
        error: function(err){
          console.error(err);
        }
      });
    }
  });
});

$('#announcementsDiv').on('click', '.delete', function(){
  var idTag = this.id;
  console.log(idTag);
  $.ajax({
    type: "DELETE",
    url: `/announce/${idTag}`,
    success: function() {
      console.log("Delete announcement successful");
      window.location.href = '../announce.html';
    },
    error: function(err) {
      console.error(err);
    }
  })

  // this.attr('id')
});

function generateAnnnouncements(data) {
  // data = GET result off all announcements
  var appendObj = {};
  var promises = [];
  var dataBottom = data.length - 3;
  if(data.length < 3){
    dataBottom = 0;
  }
  var sortedData = sortByKey(data, 'id');
  for(var i=dataBottom; i<data.length; i++){
    userID = sortedData[i].userId;
    appendObj[i] = {
      title: sortedData[i].title,
      content: sortedData[i].content,
      idid: sortedData[i].id
    };
    console.log('userID- ', userID);
    promises.push(
    $.ajax({
      type: "GET",
      url: `/users/${userID}`,
      success: function() {
        console.log("get user by userID successful");
      },
      error: function(err) {
        console.error(err);
      }
    }));
  }

  Promise.all(promises).then(function(result){
    console.log('promiseAll result- ', result);
    console.log('appendObj- ', appendObj);
    var key = 0;
    for(var i=dataBottom; i<data.length; i++){
      appendObj[i].name = result[key].firstName;
      key++;
    }
    appendAnnounce(appendObj);
  });
}

function appendAnnounce(obj){
  var $announceDiv = $('#announcementsDiv');
  for (var key in obj){
    var title = obj[key].title;
    var content = obj[key].content;
    var name = obj[key].name;
    var idTag = obj[key].idid;

    var newAnnounce = `
    <div class="row announcementRow">
    <p class="announcementP">${title}:</p>
    <p class="announcementP">${content}</p>
    <p class="announcementP">From: ${name}</p>
    <a class="btn-floating btn-small waves-effect waves-light orange delete" id="${idTag}"><i class="material-icons">delete</i></a>
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
