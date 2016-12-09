'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { users, token, admin, foods } = require ('./routes');

const port = process.env.PORT || 8000;
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  console.log('Hello Worlds');
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

app.use('/users', users);
app.use('/foods', foods);
app.use('/token', token);
app.use('/admin', admin);

module.exports = app;
