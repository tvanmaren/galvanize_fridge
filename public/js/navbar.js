'use strict';

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

  
});

$(window).scroll(function() {
    // console.log($(this).scrollTop());
    var secondPhase = $('.second-phase').offset().top - $('.second-phase').height() - 20;

    if($(this).scrollTop() > secondPhase) {
      $('#mainNav').css({"box-shadow": '0 0 10px 0 rgba(0,0,0,0.3)'});
      $('#dropNav').slideDown(200);
    }
    if($(this).scrollTop() < secondPhase) {
      $('#mainNav').css({"box-shadow": '0 0 10px 0 rgba(0,0,0,0)'});
      $('#dropNav').slideUp(200);
    }
});
