'use strict';
$(
  $('form.login').submit(function (event) {
    event.preventDefault();
    let email = $('#email').val();
    let password = $('#password').val();
    $.post('/token', {
        email,
        password
      })
      .then(
        (response) => {
          console.log("RESPONSE:",response);
          sessionStorage.setItem('token', response.token);
        },
        (error) => {
          console.error("ERROR",error);
        },
        () => {
          console.log("POST COMPLETE");
        });
  })
);
