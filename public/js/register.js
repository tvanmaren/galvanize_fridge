'use strict';
$(function() {
  console.log('Getting into login.js');
    $("#register-button").click(function (event) {
        event.preventDefault();
        submitLogin();
    });
});

function submitLogin() {
    var newUser = {
        firstName: $("#give-first-name").val(),
        lastName: $("#give-last-name").val(),
        email: $("#give-email").val().toLowerCase(),
        password: $("#set-password").val()
    };

    if ($("#set-password").val() !== $("#retype-password").val()) {
        Materialize.toast('Passwords do not match', 3000);
    }

    // TODO: Send newFood to server
    // The server will need to get the userID according to the name that was entered
    var $xhr = $.ajax({
        type: "POST",
        url: "/users/",
        data: newUser,
        success: function(result) {
            Materialize.toast(`SUCCESS: User ${result.email} registered`, 1000);
            setTimeout(()=>{window.location.replace('/fridge.html');}, 1500);
        }
    });

    $xhr.fail((err) => {
        if(err.responseText === 'Account already exists'){
          Materialize.toast('Email already exists in database');
        }
        console.error('clientside error: ', err);
    });
}
