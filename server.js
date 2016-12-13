'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const users = require('./routes/users');
const token = require ('./routes/token');
const admin = require ('./routes/admin');
const foods = require ('./routes/foods');
const announce = require ('./routes/announce');
const config = require('./knexfile');

const jwt = require('jsonwebtoken');
const boom = require('boom');

const port = process.env.PORT || 8000;

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(function (req, res, next) {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(boom.create(401, 'Unauthorized'));
      }
      req.user = decoded;
      next();
    });
  } else {
    next();
  }

})

app.use('/fridge.html', function (req,res,next) {
  if (!req.user) {
    res.redirect('/')
  } else {
    next();
  }
});

app.use('/new-entry.html', function (req,res,next) {
  if (!req.user) {
    res.redirect('/')
  } else {
    next();
  }
});

app.use(express.static('./public'));

// app.use('/secure', express.static('./public/secure'));

app.use(users);
app.use(token);

app.use(foods);
app.use(announce);
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
