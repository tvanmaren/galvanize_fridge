'use strict';
$(function() {
  console.log('Getting into login.js');
    $("#register-button").click(function() {
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

console.log(newUser);

    if ($("#set-password").val() !== $("#retype-password").val()) {
        Materialize.toast('Passwords do not match', 3000);
    }

    // TODO: Send newFood to server
    // The server will need to get the userID according to the name that was entered
    var $xhr = $.ajax({
        type: "POST",
        url: "http://localhost:8000/users",
        data: newUser,
        success: function(result) {
          if(result === 'res.send Account already exists'){
            Materialize.toast('Email already exists in database');
            return;
          }
            console.log("post successful ", result);
            window.location.href = '../new-entry.html';
        }
    });

    $xhr.fail((err) => {
        if(err.responseText === 'Account already exists'){
          Materialize.toast('Email already exists in database');
        }
        console.error('clientside error: ', err);
    });
}
