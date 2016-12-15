'use strict';

// DOCUMENT.READY
$(function() {
  $('#navBar').css({
    'position': 'fixed',
    'top': '0',
    'z-index': '10',
  });
  $('#mainNav').css({
    "position": 'relative',
    "z-index": '10',
  });
  $('#dropNav').css({
    "postition": 'relative',
    "z-index": '5',
    "background-color": '#74CFAE !important',
    "box-shadow": '0 0 10px 0 rgba(0,0,0,0.5)'
  });
  $('body').css({
    'padding-top': $('#navBar').height(),
  });
// END DOCUMENT.READY

});

$(window).scroll(function() {
    var initialize = $('navBar').height() + 10;

    if($(this).scrollTop() > initialize) {
      $('#mainNav').slideUp(200);
      $('#dropNav').slideDown(200);
    }
    if($(this).scrollTop() < initialize) {
      $('#mainNav').slideDown(200);
      $('#dropNav').slideUp(200);
    }
});
