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
  $('input.autocomplete').autocomplete({
    data: {
      // TODO The keys will be the names of all users
      "Anna": null,
      "Cassie": null,
      "Tristen": null,
      "Kevin": null,
      "Evan": null
      // "Apple": null,
      // "Microsoft": null,
      // "Google": 'http://placehold.it/250x250'
    }
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
  console.log(Date.now());
  var expirationVal = 0;
  if ($("#date-picker").val()) {
    expirationVal = Date.now() + (1000 * 60 * 60 * 24) * $("#date-picker").val();
  } else {
    expirationVal = Date.now() + (1000 * 60 * 60 * 24) * 3; //3 days is the default
  }
  console.log(expirationVal);

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
  // TODO: Send newFood to server
}
