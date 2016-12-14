'use strict';
$(function() {
  AJAX_JSON_Req(jsonfile);

  $("#svg_container").click(function() {
    updateAnimation();
  });

  if ($(window).width() < 800) {
    resizeAnim(400, 150, "small");
  }

  // check the current size of the window, load the smaller anim
  $(window).resize(function() {
    if ($(window).width() < 800) {
      resizeAnim(400, 150, "small");
    } else {
      resizeAnim(800, 300, "large");
    }
  });
});


// var jsonfile = "fridge_monster/fridge_monster_large.json",
var jsonfile = "fridge_monster/fridge_monster_large.json",
fps = 24,
width = 800,
height = 300,
AJAX_req;

// TODO: This should be called on a delay


function handle_AJAX_Complete() {
  if( AJAX_req.readyState == 4 && AJAX_req.status == 200)
  {
    var container = document.getElementById("svg_container");
    var json = JSON.parse(AJAX_req.responseText);
    var comp = new SVGAnim(json, width,height,fps);
    container.appendChild(comp.s.node);
  }

}

function AJAX_JSON_Req( url )
{
    AJAX_req = new XMLHttpRequest();
    AJAX_req.open("GET", url, true);
    AJAX_req.setRequestHeader("Content-type", "application/json");

    AJAX_req.onreadystatechange = handle_AJAX_Complete;
    AJAX_req.send();
}

function resizeAnim(newWidth, newHeight, size) {
  $("svg").remove();

  // append new monster with new dimensions
  jsonfile = "fridge_monster/fridge_monster_" + size + ".json",
  fps = 24,
  width = newWidth,
  height = newHeight,
  AJAX_req;

  AJAX_JSON_Req(jsonfile);
}

function updateAnimation() {

}

// On click, load differen Json files when an animation completes?
// Keep the animations small enough that it wont look like a huge delay
