'use strict';

/* eslint-disable camelcase*/

const express = require('express');
const ev = require('express-validation');
const router = express.Router();
const knex = require('../knex');
const {camelizeKeys,decamelizeKeys} = require('humps');
const boom = require('boom');
const jwt = require('jsonwebtoken');


const authorize = function(req, res, next) {
  const token = req.cookies.token;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }
    console.log('decoded: ', decoded);
    req.token = decoded;

    next();
  });
};


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
  res.send('pingpong' + req.params.id+2);

});

module.exports = router;
