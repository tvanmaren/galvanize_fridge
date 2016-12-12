'use strict';

/* eslint-disable camelcase*/

const express = require('express');
const ev = require('express-validation');
const dotenv = require('dotenv').config();
// const validations = require('../validations/books');

// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const app = require('../server.js');

const {
  camelizeKeys,
  decamelizeKeys
} = require('humps');

const boom = require('boom');

router.post('/token', function (req, res, next) {
  knex('users')
    .where('email', req.body.email)
    .first()
    .then((rows) => {
      const users = camelizeKeys(rows);
      if (typeof users === 'undefined') {
        next(boom.create(403, 'Login failed. User not found'));
      }
      let password = req.body.password;
      bcrypt.compare(password, users.hashedPassword)
        .then(() => {
          const token = jwt.sign({
            userId: users.id,
            userEmail: users.email,
            isAdmin: users.isAdmin,
            // exp: Math.floor(Date.now() / 1000) + (60 * 1)
          }, process.env.JWT_SECRET);

          res.cookie('token', token, {
            httpOnly: false
          });
          res.send(200);
        })
        .catch((err) => {
          console.error(err);
          next(boom.create(403, 'Login failed. Password invalid.'));
        });
    });
});


module.exports = router;
