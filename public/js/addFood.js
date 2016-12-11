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
      "annaklotko@gmail.com": null,
      "Cassie": null,
      "Tristen": null,
      "Kevin": null,
      "Evan": null
    }
  });
});

function selectPhoto() {
  cloudinary.openUploadWidget({ cloud_name: 'dgt2xab7d', upload_preset: 'x2hiolgr'},
      function(error, result) {
        console.error(error);
        photoURL = result[0].secure_url;
        // Display photo preview
        $("#photoPreview").attr("src", result[0].secure_url);
      });

}

function submitForm() {
  //Get the expiration date in Unix time
  var expirationVal = Date.now() + (1000 * 60 * 60 * 24) * parseInt($("#datePicker").val());;

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
    expiration: expirationVal,
    comments: $("#textarea1").val()
  };

  if (!newFood.email_address) {
    Materialize.toast('Please enter email', 3000);
  } else if (!newFood.image_url) {
    Materialize.toast('Please take a photo of your food', 3000)
  } else {
    var $xhr = $.ajax({
      type: "POST",
      url: "http://localhost:8000/foods",
      data: newFood,
      success: function(result) {
        console.log("post successful ", result);
      }
    });

    $xhr.fail((err) => {
      console.error(err);
    });
  }

  // var $xhr = $.getJSON('http://localhost:8000/foods');
  // $xhr.done((data) => {
  //   if ($xhr.status !== 200) {
  //     console.error("something went wrong");
  //     return;
  //   }
  //   console.log(data);
  // });
}
