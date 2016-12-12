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


router.get('/users', (req, res, next) => {
    knex('users')
        .orderBy('id')
        .then((result) => {
            const user = camelizeKeys(result);
            res.send(user);
        })
        .catch((err) => {
            next(err);
        });
});

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

router.get('/useremails', (req, res, next) => {
  console.log("1");
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
    })
})

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
                return next(boom.create(400, 'Account already exists'));
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
                                // .select('id', 'first_name', 'last_name', 'email')
                                .where('email', email)
                                .first()
                                .then((result) => {
                                    res.set('Content-Type', 'application/json');
                                    const resultCamel = camelizeKeys(result);
                                    const token = jwt.sign({
                                        userId: resultCamel.id,
                                        userEmail: resultCamel.email,
                                        isAdmin: resultCamel.isAdmin,
                                        exp: Math.floor(Date.now() / 1000) + (60 * 1)
                                    }, process.env.JWT_SECRET);
                                    // req.cookies={'token': token};
                                    res.cookie('token', token, {
                                      httpOnly: false
                                    });

                                    res.send(resultCamel);
                                });
                        })
                        .catch((err) => {
                            next(err);
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

router.patch('/users/:id', (req, res, next) => {
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
