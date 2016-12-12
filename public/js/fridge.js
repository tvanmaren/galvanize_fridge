'use strict';

$(function() {
  // var $foodDiv = $('#foodCards');
  //
  // $foodDiv.css({'height': '800px'});
  //
  // $.getJSON('http://localhost:8000/foods/active').done((data) => {
  //   data.map((item) => {
  //     generateCard(item.id, item.user_id, item.image_url, item.comments, item.category);
  //   });
  // });

  // $foodDiv.append(newCard);

  //Click on User Icon
$('#checkUser').click(function() {
  checkUserInfo()
})
});

function checkUserInfo() {
  var $xhr = $.ajax({
      type: "GET",
      url: "http://localhost:8000/users",
      success: function(result) {
        $('#nameGoesHere').text(result[0].firstName);
        $('#contentHere').text(result[0].email)
          console.log("GET successful ", result);
      }
  });

  $xhr.fail((err) => {
      console.error(err);
  });

}


// function generateCard(id, user_id, image_url, comments, category) {
//   var $foodDiv = $('#foodCards');
//   var categoryName = setCategory(category);
//
//   var newCard = `
//         <div class="col s4" id="${id}">
//           <div class="card">
//             <div class="card-image">
//               <img src="${image_url}">
//             </div>
//             <div class="card-content">
//               <p>${comments}</p>
//             </div>
//             <div class="card-action">
//               <a><i class="material-icons food-action" value="${id}">delete</i></a>
//               <span class="new badge orange">${categoryName}</span>
//             </div>
//           </div>
//         </div>
// `;
//
//   $foodDiv.append(newCard)
// }
//
// function setCategory (catID) {
//   switch (catID){
//     case 1:
//     return 'Personal';
//     break;
//     case 2:
//     return 'Community';
//     break;
//     case 3:
//     return 'Event';
//     break;
//     default:
//     return 'Personal';
//     break;
//   }
// }
