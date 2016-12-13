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

const authorize=require('./modules/authorize');

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

router.get('/foods?catId=:catId&catName=:catName', (req, res, next) => {
  const categories = {
    'personal': 1,
    'community': 2,
    'event': 3
  };
  const catId = req.params.catId || categories[req.params.catName];
  knex('foods')
    .where('active', true)
    .andWhere('category', catId)
    .then((items) => {
      res.send(items);
    })
    .catch((err)=>{
      next(err);
    });
});

router.get('/foods/:userId/', (req, res, next) => {
  knex('foods')
    .where('active', true)
    .andWhere('user_id', req.params.userId)
    .then((items) => {
      res.send(items);
    })
    .catch((err)=>{
      next(err);
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
    })
    .catch((err)=>{
      next(err);
    });
});

module.exports = router;
