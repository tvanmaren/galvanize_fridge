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
        .orderBy('first_name')
        .then((result) => {
            const user = camelizeKeys(result)
            res.send(user)
        })
        .catch((err) => {
            next(err)
        })
})

router.get('/users/:id', (req, res, next) => {
    knex('users')
        .where('id', req.params.id)
        .first()
        .then((result) => {
            const user = camelizeKeys(result)
            res.send(user)
        })
        .catch((err) => {
            next(err)
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
                            first_name: firstName,
                            last_name: lastName,
                            email: email,
                            hashed_password: hashedPassword
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
                                        userId: result.id,
                                        userEmail: result.email,
                                        exp: Math.floor(Date.now() / 1000) + (60 * 1)
                                    }, process.env.JWT_SECRET);
                                    // res.redirect('/fridge')
                                    res.json({
                                        success: true,
                                        message: 'Enjoy your token!',
                                        token: token
                                    });
                                })
                        })
                        .catch((err) => {
                            next(err)
                        })
                })
                .catch((err) => {
                    next(err)
                })
        })
        .catch((err) => {
            next(err)
        })
});

router.patch('/users/:id', (req, res, next) => {
    const body = req.body;

    if (isNaN(req.body.params)) {
        return next(boom.create(404, 'Not Found'));
    }

    knex('users')
    .where('id', req.params.id)
    .first()
    .then(() => {


    const updateUserInfo = {
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email
    }

    const updateUser = decamelizeKeys(updateUserInfo);

    return knex('users')
        .where('id', req.params.id)
        .first()
        .then((pickUser) => {
            if (!pickUser) {
                return next(boom.create(404, 'Not Found'));
            }
            return knex('users')
                .update(updateUser, '*')
                .where('id', req.params.id)
                .then((updatedUser) => {
                    res.set('Content-Type', 'application/json');
                    const updatedUserCamel = camelizeKeys(updatedUser);
                    res.send(updatedUserCamel)
                })
                .catch((err) => {
                    next(err);
                })
        })
        .catch((err) => {
            next(err);
        })
      })
      .catch((err) => {
        next(err);
      })
})

module.exports = router;
