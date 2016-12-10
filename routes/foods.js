'use strict';

/* eslint-disable camelcase*/

const express = require('express');
const ev = require('express-validation');
const router = express.Router();
const knex = require('../knex');
const {camelizeKeys,decamelizeKeys} = require('humps');
const boom = require('boom');

router.get('/active', (req, res, next) => {
  knex('food')
  .where('active', true)
  .then((data) => {
    if(data.length === 0) {
      res.status(416).send('Requested Range not satisfiable');
    }
    res.send(data);
  });
});

router.get('/active/:filter', (req, res, next) => {
  var activeItems;

  knex('food')
  .where('active', true)
  .then((data) => {
    activeItems = data;
  })
  .then(() => {
    
  });
});

module.exports = router;
