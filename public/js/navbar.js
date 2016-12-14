'use strict';

$(function() {
  $('#navBar').css({
    'position': 'static',
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
});

$(window).scroll(function() {
    // console.log($(this).scrollTop());
    var $nav = $('#navBar');
    var firstPhase = 1;
    var secondPhase = $('.second-phase').offset().top - $('.second-phase').height();

    var isPositionFixed = ($nav.css('position') === 'fixed');
    if ($(this).scrollTop() > firstPhase && !isPositionFixed) {
        $nav.css({
            'position': 'fixed',
            'top': '0px',
            'box-shadow': '0 0 10px 0 rgba(0,0,0,0.3)'
        });
        $('body').css({
          'padding-top': $nav.height(),
        });
    }
    if ($(this).scrollTop() < firstPhase && isPositionFixed) {
        $nav.css({
            'position': 'static',
            'top': '0px'
        });
        $('body').css({
          'padding-top': '0',
        });
    }

    if($(this).scrollTop() > secondPhase) {
      $('#mainNav').css({"box-shadow": '0 0 10px 0 rgba(0,0,0,0.3)'});
      $('#dropNav').slideDown(200);
    }
    if($(this).scrollTop() < secondPhase) {
      $('#mainNav').css({"box-shadow": '0 0 10px 0 rgba(0,0,0,0)'});
      $('#dropNav').slideUp(200);
    }
});
