'use strict';

$(
  $("form.login").submit(function (event) {
    event.preventDefault();
    alert('submitted');
    event.submit();
  })
);
