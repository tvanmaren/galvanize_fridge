'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const users = require('./routes/users');
const token = require ('./routes/token');
const admin = require ('./routes/admin');
const foods = require ('./routes/foods');
const config = require('./knexfile');

const port = process.env.PORT || 8000;

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.static('./public'));

app.use(users);
app.use(token);
app.use(foods);
app.use(admin);

app.get('/', (req, res, next) => {
  console.log('Hello Worlds');
});

app.post('/', (req, res, next) => {
  console.log(req.body);
});



app.listen(port, () => {
  console.log('Listening on port', port);
});


module.exports = app;
