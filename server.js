'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const users = require ('./routes/users');
const token = require ('./routes/token');
const admin = require ('./routes/admin');
const foods = require ('./routes/foods');
const config = require('./knexfile');

const port = process.env.PORT || 8000;

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static('./public'));

app.use(token);

app.use(function(req,res,next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.send(false);
    }
    req.decoded = decoded;
    // res.send(true);
    next();
    });
  }
  else{
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

app.use(users);
// app.use('/foods', foods);
// app.use('/admin', admin);

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
