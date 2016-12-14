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

router.get('/announce/:id', (req, res, next) => {
    knex('announcements')
        .where('id', req.params.id)
        .first()
        .then((result) => {
            const user = camelizeKeys(result);
            res.send(user);
        })
        .catch((err) => {
            next(err);
        });
});


router.post('/announce', (req,res,next) =>{
  const {
      title,
      content,
      userId
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
      "content": content,
      "user_id": userId
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


router.patch('/announce/:id', (req, res, next) => {
  var announceId = Number.parseInt(req.params.id);

  if (Number.isNaN(announceId)) {
    return next(boom.create(400, 'Announcement id isNaN'));
  }

  knex('announcements')
    .where('id', announceId)
    .first()
    .then((announce) => {
      if (!announce) {
        throw boom.create(404, 'Not Found');
      }

      const { title, content } = req.body;
      const updateAnnouncement = {};

      if (title) {
        updateAnnouncement.title = title;
      }

      if (content) {
        updateAnnouncement.content = content;
      }

      return knex('announcements')
        .update(decamelizeKeys(updateAnnouncement), '*')
        .where('id', announceId);
    })
    .then((rows) => {
      const announcement = camelizeKeys(rows[0]);

      res.send(announcement);
    })
    .catch((err) => {
      next(err);
    });
});


router.delete('/announce/:id', (req, res, next) =>{
  var announceId = Number.parseInt(req.params.id);

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
