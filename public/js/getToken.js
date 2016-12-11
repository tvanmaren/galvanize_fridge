'use strict';
$(
  $('form.login').submit(function (event) {
    event.preventDefault();
    let email = $('#email').text();
    let password = $('#password').text();
    $.post('/token', {
        email,
        password
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        },
        (always) => {
          console.log('REQUEST COMPLETE:', always);
        });
  })
);
