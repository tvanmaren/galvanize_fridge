'use strict';

/* eslint-disable camelcase*/

const express = require('express');
const ev = require('express-validation');
const router = express.Router();
const knex = require('../knex');
const {
  camelizeKeys,
  decamelizeKeys
} = require('humps');
const boom = require('boom');
const jwt = require('jsonwebtoken');

const authorize = require('./modules/authorize');

router.get('/foods', (req, res, next) => {
  //TODO order by date expired
  knex('foods')
    .where('active', true)
    .then((foods) => {
      res.send(foods);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/foods/personal', (req, res, _next) => {
  knex('foods')
    .where('active', true)
    .andWhere('category', 1)
    .then((items) => {
      res.send(items);
    });
});

router.get('/foods/community', (req, res, _next) => {
  knex('foods')
    .where('active', true)
    .andWhere('category', 2)
    .then((items) => {
      res.send(items);
    });
});

router.get('/foods/event', (req, res, _next) => {
  knex('foods')
    .where('active', true)
    .andWhere('category', 3)
    .then((items) => {
      res.send(items);
    });
});

router.get('/foods?userId=:id', (req, res, _next) => {
  console.log('ID:',req.params.id);
  knex('foods')
    .where({'active': true, 'user_id': req.params.id})
    .then((items) => {
      console.log(req.params.id,items);
      res.send(items);
    })
    .catch((err)=>{
      console.error(err);
    });
});

router.post('/foods', authorize, (req, res, next) => {
  //TODO get user ID from header, add userID to insert
  console.log(req.token.userId);
  knex('foods')
    .insert({
      user_id: req.token.userId,
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
});

router.delete('/foods/:id', (req, res, next) => {
  knex('foods')
    .where('id', req.params.id)
    .first()
    .update('active', false)
    .then((item) => {
      res.send(item.active);
    });
});

module.exports = router;
