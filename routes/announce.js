'use strict';

/* eslint-disable camelcase*/

const express = require('express');
const ev = require('express-validation');
// const validations = require('../validations/books');

const bcrypt = require('bcrypt-as-promised');

// eslint-disable-next-line new-cap
const router = express.Router();

const knex = require('../knex');

const jwt = require('jsonwebtoken');

const {
    camelizeKeys,
    decamelizeKeys
} = require('humps');

const boom = require('boom');


router.get('/announce', (req, res, next) => {
    knex('announcements')
        .orderBy('id')
        .then((result) => {
            const user = camelizeKeys(result);
            res.send(user);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/announce', (req,res,next) =>{
  //TODO include email in header, use token to get user_id
  //TODO fill out js/html to grab/set header
  const {
      title,
      content
  } = req.body;

  if (!content) {
      return next(boom.create(400, 'Please enter announcement content'));
  }
  knex('announcements')
      .where('content', content)
      .first()
      .then((result) => {
          if (result) {
            next(boom.create(400, 'Exact same announcement is already posted'));
          }
      })
      .catch((err) =>{
        next(err);
      });
  knex('announcements')
    .insert({
      "title": title,
      "content": content
    })
    .then(() =>{
      return knex('announcements')
      .where('content', content)
      .first()
      .then((result) =>{
        const newAnnounce = camelizeKeys(result);
        res.send(newAnnounce);
      });

    })
    .catch((err) =>{
      next(err);
    });
});

router.delete('/announce/:id', (req, res, next) =>{
  const announceId = Number.parseInt(req.params.id);

  let toDelete;

  knex('announcements')
  .where('id', announceId)
  .first()
  .then((result) =>{
    if (!result) {
      next(boom.create(404, 'Announcement not found'));
    }

    toDelete = camelizeKeys(result);

    return knex('announcements')
      .del()
      .where('id', toDelete.id);
  })
  .then(() =>{
    delete toDelete.id;
    res.send(toDelete);
  })
  .catch((err) =>{
    next(err);
  });

});

module.exports = router;
