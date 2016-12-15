$(document).ready(function () {
  console.log("getting to announcementTicker.js");
  $('.newsticker').newsTicker();
})

$('.newsticker').newsTicker({
    row_height: 27,
    max_rows: 2,
    speed: 600,
    direction: 'up',
    duration: 4000,
    autostart: 1,
    pauseOnHover: 0
});
