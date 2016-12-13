'use strict';
$(function() {
  console.log("loaded");
  AJAX_JSON_Req(jsonfile);
});

var jsonfile = "fridge_monster.json",
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

// On click, load differen Json files when an animation completes?
// Keep the animations small enough that it wont look like a huge delay
