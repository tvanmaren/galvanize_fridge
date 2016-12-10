'use strict';

var photoURL;

$(function() {
  $("#upload_widget_opener").click(function() {
    selectPhoto();
  });

  $("#submitButton").click(function() {
    submitForm();
  });

  //TODO Get request to server for pulling names of users
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
  //Get the expiration date in Unix time
  var expirationVal = 0;
  if ($("#datePicker").val()) {
    expirationVal = Date.now() + (1000 * 60 * 60 * 24) * parseInt($("#datePicker").val());
  } else {
    expirationVal = Date.now() + (1000 * 60 * 60 * 24) * 3; //3 days is the default
  }

  var category = "";
  if ($("#personalCat").prop("checked")) {
    category = "personalCat";
  } else if ($("#communityCat").prop("checked")) {
    category = "communityCat";
  } else if ($("#eventCat").prop("checked")){
    category = "eventCat";
  }

  var newFood = {
    email_address: $("#emailAddress").val(),
    image_url: photoURL,
    category: category,
    expiration: $("#date-picker").val(),
    comments: $("#textarea1").val()
  };

  if (!newFood.name) {
    Materialize.toast('Please enter user name', 3000);
  }
  if (!newFood.photo) {
    Materialize.toast('Please take a photo of your food', 3000)
  }

  // TODO: Send newFood to server
  // The server will need to get the userID according to the name that was entered
  var $xhr = $.ajax({
    type: "POST",
    url: "http://localhost:8000/foods",
    data: newFood,
    success: function(result) {
      console.log("post successful ", result);
    }
  });

  // var $xhr = $.getJSON('http://localhost:8000/foods');
  // $xhr.done((data) => {
  //   if ($xhr.status !== 200) {
  //     console.error("something went wrong");
  //     return;
  //   }
  //   console.log(data);
  // });
  $xhr.fail((err) => {
    console.error(err);
  });
}
