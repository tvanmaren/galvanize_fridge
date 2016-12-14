'use strict';
var userID;
var editIdTag;
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

  $.ajax({
    type: "GET",
    url: `/users/self`,
    success: function(result) {
      console.log("get users/self successful ", result);
      $('#emailAddressAnnouncement').val(result.email);
      Materialize.updateTextFields();
    },
    error: function(err){
      console.error(err);
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
    } else if(newAnnounce.content.length > 50) {
      Materialize.toast('Content must be under 50 characters', 3000);
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
  });
});

$('#announcementsDiv').on('click', '.edit', function(){
  $('#modal2').modal('open');
  // This populates the email field to provide autocomplete
  editIdTag = this.id;

  $.ajax({
    type: "GET",
    url: `/announce/${editIdTag}`,
    success: function(result) {
      console.log("get announcement by id successful ", result);
      $('#editAnnounceTitle').val(result.title);
      $('#editAnnounceContent').val(result.content);
      Materialize.updateTextFields();
    },
    error: function(err){
      console.error(err);
    }
  });


});

$('#submitEditAnnounce').click(function(){

  var editAnnounce = {
    title: $('#editAnnounceTitle').val(),
    content: $('#editAnnounceContent').val(),
    id: editIdTag
  };
  if (!editAnnounce.title) {
    Materialize.toast('Label your announcement!', 3000);
  } else if (!editAnnounce.content) {
    Materialize.toast('Actually include an announcement!', 3000);
  } else if(editAnnounce.content.length > 50) {
    Materialize.toast('Content must be under 50 characters', 3000);
  }
  else{
    $.ajax({
      type: "PATCH",
      url: `/announce/${editIdTag}`,
      data: editAnnounce,
      success: function(result) {
        console.log("patch successful ", result);
        window.location.href = '../announce.html';
      },
      error: function(err){
        console.error(err);
      }
    });
  }
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

    // var newAnnounce = `
    // <div class="row announcementRow">
    // <p class="announcementP">${title}:</p>
    // <p class="announcementP">${content}</p>
    // <p class="announcementP">From: ${name}</p>
    // <a class="btn-floating btn-small waves-effect waves-light orange delete" id="${idTag}"><i class="material-icons">delete</i></a>
    // </div>
    // <br>
    // `;

    var newAnnounceCard = `<div class="row">
        <div class="col s12 m6">
          <div class="card">
            <div class="card-content white-text">
              <span class="card-title text-black">${title}</span>
              <p class="text-black">${content}</p>
              <p class="text-black">From: ${name}</p>
            </div>
            <div class="card-action">
            <a class="delete" id="${idTag}" href="#"><i class="material-icons">delete</i></a>
            <a class="edit" id="${idTag}" href="#"><i class="material-icons">edit</i></a>
            </div>
          </div>
        </div>
      </div>`;

    $announceDiv.prepend(newAnnounceCard);
  }
}

function sortByKey(array, key) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}
