'use strict';

/* eslint-disable camelcase*/

const express = require('express');
const ev = require('express-validation');
// const validations = require('../validations/books');

// eslint-disable-next-line new-cap
const router = express.Router();

const knex = require('../knex');

const {
  camelizeKeys,
  decamelizeKeys
} = require('humps');

const boom = require('boom');

router.post('/users', function(req,res){
  console.log(req);
  knex('users')
  .orderBy('id')
    .then((rows) => {
      const users = camelizeKeys(rows);
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
})

module.exports = router;
