'use strict';

var photoURL;

$(function() {
  $("#upload_widget_opener").click(function() {
    selectPhoto();
  });

  $("#submitButton").click(function() {
    submitForm();
  });
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

  // TODO: Client side form validation
  // TODO: Send newFood to server
}
