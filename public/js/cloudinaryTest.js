'use strict';

$(function() {

  console.log("loaded");
  $("#upload_widget_opener").click(function() {
    uploadPhoto();
  });
});

// function uploadPhoto() {
//   console.log("clicked button");
//   cloudinary.openUploadWidget({ cloud_name: 'dgt2xab7d', upload_preset: 'x2hiolgr'},
//       function(error, result) {
//         console.log(error, result);
//       });
  console.log($('#upload_field:file'));
  $('#upload_field').unsigned_cloudinary_upload("x2hiolgr", function() {
    console.log("THIS IS A CALLBACK");
  });
  // $('#upload_field').append($.cloudinary.unsigned_upload_tag("x2hiolgr",
  // { cloud_name: 'demo' }, function() {
  //   console.log("HELLOOOO");
  // }));
}


  // $('.upload_field').unsigned_cloudinary_upload("zcudy0uz",
  //   { cloud_name: 'demo', tags: 'browser_uploads' },
  //   { multiple: true }
  // ).bind('cloudinarydone', function(e, data) {
  //
  //   $('.thumbnails').append($.cloudinary.image(data.result.public_id,
  //     { format: 'jpg', width: 150, height: 100,
  //       crop: 'thumb', gravity: 'face', effect: 'saturation:50' } ))}
  //
  // ).bind('cloudinaryprogress', function(e, data) {
  //
  //   $('.progress_bar').css('width',
  //     Math.round((data.loaded * 100.0) / data.total) + '%');
  //
  // });
