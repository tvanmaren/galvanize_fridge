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

router.get('/active/:id', (req, res, next) => {
  var activeItems;
  var id = parseInt(req.params.id);

  knex('food')
  .where('active', true)
  .then((data) => {
    activeItems = data;
  })
  .then(() => {
    var fitting = activeItems.map((item) => {
      if(item.category === id){
        return item;
      }
    });
    return fitting;
  });
});

router.get('/foods', (req, res, next) => {
  //TODO order by date expired
  knex('foods')
    .then((foods) => {
      res.send(foods);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/foods', (req, res, next) => {

  // NOTE The user_id retreval is untested
  knex ('users')
    .where('email', req.body.email)
    .first()
    .then((result) => {
      console.log(result);
      knex('foods')
        .insert({
          user_id: result.user_id,
          image_url: req.body.image_url,
          comments: req.body.comments,
          expiration: req.body.expiration
        }, '*')
        .then((foods) => {
          res.send(foods[0]);
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
