'use strict';

/* eslint-disable camelcase*/

const express = require('express');
const ev = require('express-validation');

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

const authorize = require('./modules/authorize');

// GET ROUTE
router.get('/users', (req, res, next) => {
  if (req.query.email) {
    knex('users')
      .where('email', req.query.email)
      .first()
      .then((result) => {
        delete result.hashed_password;
        const user = camelizeKeys(result);
        res.send(user);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  } else {
    knex('users')
      .orderBy('id')
      .then((result) => {
        result.forEach((user) => {
          delete user.hashed_password;
        });
        const users = camelizeKeys(result);
        res.send(users);
      })
      .catch((err) => {
        next(err);
      });
  }
});

// GET ROUTE W/ EMAIL
router.get('/emails/:email', (req, res, next) => {
    knex('users')
        .where('email', req.params.email)
        .first()
        .then((result) => {
            const user = camelizeKeys(result);
            res.send(user);
        })
        .catch((err) => {
            next(err);
        });
});

// GET ROUTE FOR SELF
router.get('/users/self/', authorize, (req, res, next) => {
  knex('users')
    .where('id', req.token.userId)
    .first()
    .then((result) => {
      delete result.hashed_password;
      const user = camelizeKeys(result);
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

// GET ROUTE W/ ID
router.get('/users/:id', (req, res, next) => {
    knex('users')
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

// GET ROUTE USEREMAILS
router.get('/useremails/', (req, res, next) => {
  knex('users')
    .then((result) => {
      let emails = [];
      for (var i = 0; i < result.length; i++) {
        emails.push(result[i].email);
      }
      res.send(emails);
    })
    .catch((err) => {
      next(err);
    });
});

// POST ROUTE
router.post('/users', (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  if (!email) {
    return next(boom.create(400, 'Email must not be blank'));
  }
  if (!password) {
    return next(boom.create(400, 'Password must not be blank'));
  }

  knex('users')
    .where('email', email)
    .first()
    .then((result) => {
      if (result) {
        next(boom.create(400, 'Account already exists'));
      }
      return bcrypt.hash(password, 12)
        .then((hashedPassword) => {
          const {
            firstName,
            lastName
          } = req.body;

          knex('users')
            .insert({
              "first_name": firstName,
              "last_name": lastName,
              "email": email,
              "hashed_password": hashedPassword
            })
            .then(() => {
              return knex('users')
                .where('email', email)
                .first()
                .then((result) => {
                  res.set('Content-Type', 'application/json');
                  const resultCamel = camelizeKeys(result);
                  const token = jwt.sign({
                    userId: resultCamel.id,
                    userEmail: resultCamel.email,
                    isAdmin: resultCamel.isAdmin,
                  }, process.env.JWT_SECRET);

                  res.cookie('token', token, {
                    httpOnly: false
                  });

                  delete resultCamel.hashedPassword;
                  res.send(resultCamel);
                });
            })
            .catch((err) => {
              next(boom.create(400, 'Error storing user data. Reenter data and try again'));
            });
        })
        .catch((err) => {
          next(boom.create(400, 'Error storing password. Retype password and try again.'));
        });
    })
    .catch((err) => {
      next(boom.create(400, `User database error. Try again later.`));
    });
});

// UPDATE ROUTE
router.patch('/users?:id', (req, res, next) => {
  if (isNaN(req.params.id)) {
    return next(boom.create(404, 'Not Found'));
  }

  return knex('users')
    .where('id', req.params.id)
    .first()
    .then((pickUser) => {
      if (!pickUser) {
        return next(boom.create(404, 'Not Found'));
      }

      const body = req.body;
      const updateUserInfo = {
        "first_name": body.firstName,
        "last_name": body.lastName,
        "email": body.email,
        "hashed_password": pickUser.hashed_password,
        "is_admin": pickUser.is_admin
      };

      return knex('users')
        .update(updateUserInfo, '*')
        .where('id', req.params.id)
        .then((updatedUser) => {
          res.set('Content-Type', 'application/json');
          const updatedUserCamel = camelizeKeys(updatedUser);
          res.send(updatedUserCamel[0]);
          res.send({
            id: updatedUserCamel[0].id,
            firstName: updatedUserCamel[0].firstName,
            lastName: updatedUserCamel[0].lastName,
            email: updatedUserCamel[0].email
          });
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
