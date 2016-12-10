'use strict';

var photoURL;

$(function() {
  $("#upload_widget_opener").click(function() {
    selectPhoto();
  });

  $("#submitButton").click(function() {
    submitForm();
  });

  //TODO get a list of all user names from the server on load
});

function selectPhoto() {
  cloudinary.openUploadWidget({ cloud_name: 'dgt2xab7d', upload_preset: 'x2hiolgr'},
      function(error, result) {
        console.log(error);
        photoURL = result[0].secure_url;
      });
}

function submitForm() {

  var category = "";
  if ($("#personalCat").prop("checked")) {
    category = "personalCat";
  } else if ($("#communityCat").prop("checked")) {
    category = "communityCat";
  } else if ($("#eventCat").prop("checked")){
    category = "eventCat";
  }

  var newFood = {
    name: $("#name").val(),
    photo: photoURL,
    category: category,
    expiration: $("#date-picker").val(),
    comments: $("#textarea1").val()
  };
  console.log(newFood);

  if (!newFood.name) {
    Materialize.toast('Please enter user name', 3000);
  }
  if (!newFood.photo) {
    Materialize.toast('Please take a photo of your food', 3000)
  }
  if (!newFood.expiration) {
    //TODO: Set default date
  }
  // TODO: Send newFood to server
}
