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

    req.token = decoded;

    next();
  });
};

router.get('/active', authorize, (req, res, next) => {
  knex('food')
  .where('active', true)
  .then((data) => {
    if(data.length === 0) {
      res.status(416).send('Requested Range not satisfiable');
    }
    res.send(data);
  });
});

router.get('/active/:id', authorize, (req, res, next) => {
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

router.get('/foods', authorize, (req, res, next) => {
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
  // NOTE The user_id retreval isx untested
  console.log("FOOD");

  // knex ('users')
  //   .where('email', req.body.email)
  //   .first()
  //   .then((result) => {
  //     console.log(result);
  //     knex('foods')
  //       .insert({
  //         user_id: result.user_id,
  //         image_url: req.body.image_url,
  //         comments: req.body.comments,
  //         expiration: req.body.expiration
  //       }, '*')
  //       .then((foods) => {
  //         res.send(foods[0]);
  //       })
  //       .catch((err) => {
  //         next(err);
  //       });
  //   })
  //   .catch((err) => {
  //     next(err);
  //   });
});

module.exports = router;
