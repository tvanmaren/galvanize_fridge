'use strict';
$(function() {
  console.log('Getting into login.js');
    $("form.register").click(function (event) {
        event.preventDefault();
        submitLogin();
    });
});

function submitLogin() {
    var newUser = {
        first_name: $("#give-first-name").val(),
        last_name: $("#give-last-name").val(),
        email: $("#give-email").val(),
        password: $("#set-password").val()
    };

    if ($("#set-password").val() !== $("#retype-password").val()) {
        Materialize.toast('Passwords do not match', 3000);
    }

    // TODO: Send newFood to server
    // The server will need to get the userID according to the name that was entered
    var $xhr = $.ajax({
        type: "POST",
        url: "/users",
        data: newUser,
        success: function(result) {
            Materialize.toast(`SUCCESS: User ${result.email} registered`, 1000);
            setTimeout(()=>{window.location.replace('/fridge.html');}, 1500);
        }
    });

    $xhr.fail((err) => {
        console.error(err);
    });
}
