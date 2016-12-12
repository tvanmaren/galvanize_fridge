'use strict';

/* eslint-disable camelcase*/

const express = require('express');
const ev = require('express-validation');
const router = express.Router();
const knex = require('../knex');
const {camelizeKeys,decamelizeKeys} = require('humps');
const boom = require('boom');
const jwt = require('jsonwebtoken');

// const authorize = function(req, res, next) {
//   const token = req.cookies.token;
//   console.log("1");
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     console.log("2", token);
//     if (err) {
//       return next(boom.create(401, 'Unauthorized'));
//     }
//
//     req.token = decoded;
//
//     next();
//   });
// };

// router.get('/active', authorize, (req, res, next) => {
//   knex('food')
//   .where('active', true)
//   .then((data) => {
//     if(data.length === 0) {
//       res.status(416).send('Requested Range not satisfiable');
//     }
//     res.send(data);
//   });
// });
//
// router.get('/active/:id', authorize, (req, res, next) => {
//   var activeItems;
//   var id = parseInt(req.params.id);
//
//   knex('food')
//   .where('active', true)
//   .then((data) => {
//     activeItems = data;
//   })
//   .then(() => {
//     var fitting = activeItems.map((item) => {
//       if(item.category === id){
//         return item;
//       }
//     });
//     return fitting;
//   });
// });

router.get('/foods', (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return next(boom.create(401, 'Unathorized'));
    }
  });
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
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unathorized'));
    }
    req.token = decoded;
    next();

    return knex ('users')
      .where('email', req.body.email)
      .first()
      .then((result) => {
        if (!result) {
          return next(boom.create(400, 'Bad Request'));
        }
        return knex('foods')
          .insert({
            "user_id": result.id,
            "image_url": req.body.image_url,
            "comments": req.body.comments,
            "expiration": req.body.expiration
          }, '*')
          .then((foods) => {
            console.log(foods);
            // res.set('Content-type', 'application/json');
            res.send(foods[0]);
          })
          .catch((err) => {
            return next(err);
          });
      })
      .catch((err) => {
        return next(err);
      });

  });
});

module.exports = router;
