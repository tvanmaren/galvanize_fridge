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

router.get('/foods', (req, res, next) => {
  //TODO order by date expired
  knex('foods')
    .then((foods) => {
      res.send(foods)
    })
    .catch((err) => {
      next(err);
    });
});

// router.post('/foods', (req, res next) => {
//   knex('foods')
// })

module.exports = router;
