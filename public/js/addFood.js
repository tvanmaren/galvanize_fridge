'use strict';

var photoURL;

$(function () {
  $("#upload_widget_opener").click(function () {
    selectPhoto();
  });

  $("#submitButton").click(function () {
    submitForm();
  });

  // This populates the email field to provide autocomplete
  var $xhr = $.ajax({
    type: "GET",
    url: "/useremails",
    success: function (result) {
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
  cloudinary.openUploadWidget({
      cloud_name: 'dgt2xab7d',
      upload_preset: 'x2hiolgr'
    },
    function (error, result) {
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
    category = 1;
  } else if ($("#communityCat").prop("checked")) {
    category = 2;
  } else if ($("#eventCat").prop("checked")) {
    category = 3;
  }
  let email = $("#emailAddress").val();

  var newFood = {
    imageUrl: photoURL,
    category: category,
    expiration: expirationVal,
    comments: $("#textarea1").val()
  };

  if (!email) {
    Materialize.toast('Please enter email', 3000);
  } else if (!newFood.imageUrl) {
    Materialize.toast('Please take a photo of your food', 3000);
  } else {
    $.getJSON(`/users?email=${email}`)
      .done((userData) => {
        console.log(userData);
        newFood['userId'] = userData.id;
        console.log('New Food Item', newFood);
        $.post('/foods', newFood)
          .done((result) => {
            console.log("post successful ", result);
            window.location.href = '../fridge.html';
          })
          .fail((err) => {
            console.error(err);
          });
      })
      .fail((err) => {
        console.error(err);
      });
  }
}
