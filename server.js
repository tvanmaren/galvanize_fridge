'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const users = require('./routes/users');
const token = require ('./routes/token');
const admin = require ('./routes/admin');
const foods = require ('./routes/foods');

const port = process.env.PORT || 8000;
app.use(bodyParser.json());

app.use(express.static('./public'));

app.use(users);
// app.use('/foods', foods);
// app.use('/token', token);
// app.use('/admin', admin);

app.get('/', (req, res, next) => {
  console.log('Hello Worlds');
});

app.listen(port, () => {
  console.log('Listening on port', port);
});


module.exports = app;
