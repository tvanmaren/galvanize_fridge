'use strict';

/* eslint-disable camelcase*/

const express = require('express');

const dotenv = require('dotenv').config();
const ev = require('express-validation');

const router = express.Router();
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const authorize=require('./modules/authorize');

const {
  camelizeKeys
} = require('humps');

const boom = require('boom');

// AUTHORIZE BY GET ROUTE
router.get('/token', (req, res, next) => {
  authorize(req, res, next);
});

router.get('/token', (req, res, next) => {
  res.sendStatus(200);
});                   // once the next of the authorize route triggers, go here

// POST TOKEN ROUTE
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
            exp: Math.floor(Date.now() / 1000) + (60 * 480)  // token lasts 8 hr
          }, process.env.JWT_SECRET);

          res.cookie('token', token, {
            httpOnly: false
          });
          res.sendStatus(200);
        })
        .catch((err) => {
          console.error(err);
          next(boom.create(403, 'Login failed. Password invalid.'));
        });
    });
});

// DELETE TOKEN ROUTE
router.delete('/token', function(req, res, next) {
    res.clearCookie('token');
    res.send(true);
});

module.exports = router;
