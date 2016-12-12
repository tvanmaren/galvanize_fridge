'use strict';

var photoURL;

$(function() {
  $("#upload_widget_opener").click(function() {
    selectPhoto();
  });

  $("#submitButton").click(function() {
    submitForm();
  });

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
      $('input.autocomplete').autocomplete({
        data: emailObj
      });
    }
  });
});

function selectPhoto() {
  cloudinary.openUploadWidget({ cloud_name: 'dgt2xab7d', upload_preset: 'x2hiolgr'},
      function(error, result) {
        if (error) {
          console.error(error);
        }
        photoURL = result[0].secure_url;
        // Display photo preview
        $("#photoPreview").attr("src", result[0].secure_url);
      });

}

function submitForm() {
  //Get the expiration date in Unix time
  var expirationVal = Date.now() + (1000 * 60 * 60 * 24) * parseInt($("option").filter(":selected").val());

  var category = "";
  if ($("#personalCat").prop("checked")) {
    category = "personalCat";
  } else if ($("#communityCat").prop("checked")) {
    category = "communityCat";
  } else if ($("#eventCat").prop("checked")){
    category = "eventCat";
  }

  var newFood = {
    email: $("#emailAddress").val(),
    image_url: photoURL,
    category: category,
    expiration: expirationVal,
    comments: $("#textarea1").val()
  };

  if (!newFood.email) {
    Materialize.toast('Please enter email', 3000);
  } else if (!newFood.image_url) {
    Materialize.toast('Please take a photo of your food', 3000)
  } else {
    var $xhr = $.ajax({
      type: "POST",
      url: "/foods",
      data: newFood,
      success: function(result) {
        console.log("post successful ", result);
        window.location.href = '../fridge.html';
      }
    });

    $xhr.fail((err) => {
      console.error(err);
    });
  }
}
