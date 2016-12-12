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

app.post('/', (req, _res, _next) => {
  console.log(req.body);
});

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});


app.listen(port, () => {
  console.log('Listening on port', port);
});


module.exports = app;
