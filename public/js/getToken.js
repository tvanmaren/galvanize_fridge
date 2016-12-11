'use strict';
$(
  // When the submit button is clicked, send a POST of the data to /token, then stores the token in the header for all future requests
  $('form.login').submit(function (event) {
    event.preventDefault();
    let email = $('#email').val();
    let password = $('#password').val();
    $.post('/token', {
        email,
        password
      })
      .then(
        (response, statusTest, xhr) => {
          console.log('response:', response);
          console.log('status:', xhr.status);
          if (xhr.status === 200) {
            Materialize.toast('Login successful');
            window.location.replace("/fridge.html");
          } else {
            $('#email').val('');
            $('#password').val('');
          }
        },
        (error) => {
          Materialize.toast('Login failed');
          $('#password').val('');
          console.error("ERROR", error);
        });
  })
);
