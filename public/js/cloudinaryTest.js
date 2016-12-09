'use strict';

$(function() {

  console.log("loaded");
  $("#test_button").click(function() {
    uploadPhoto();
  });
});

function uploadPhoto() {
  console.log("clicked button 1");
  $('#upload_field').unsigned_cloudinary_upload("x2hiolgr", { cloud_name: 'demo' }).bind('cloudinarydone', function(e, data) { 
    console.log(e, data);
  });
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
