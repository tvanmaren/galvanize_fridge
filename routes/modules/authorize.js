'use strict';

const jwt = require('jsonwebtoken');
const boom = require('boom');

function authorize (req, res, next) {
  const token = req.cookies.token;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }
    req.token = decoded;

    next();
  });
}

module.exports=authorize;
