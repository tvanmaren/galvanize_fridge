'use strict';

$(function() {
  $("#upload_widget_opener").click(function() {
    uploadPhoto();
  });
});

function uploadPhoto() {
  cloudinary.openUploadWidget({ cloud_name: 'dgt2xab7d', upload_preset: 'x2hiolgr'},
      function(error, result) {
        console.log(error);
        console.log(result[0].secure_url);
      });
}
