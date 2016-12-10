'use strict';

/* eslint-disable camelcase*/

const express = require('express');
const ev = require('express-validation');
// const validations = require('../validations/books');

const bcrypt = require('bcrypt-as-promised');

// eslint-disable-next-line new-cap
const router = express.Router();

const knex = require('../knex');

const {
    camelizeKeys,
    decamelizeKeys
} = require('humps');

const boom = require('boom');

router.get('/users', (req, res, next) => {
    knex('users')
        .orderBy('first_name')
        .then((result) => {
            res.set('Content-type', 'application/json')
            res.send(results)
        })
})

router.post('/users', (req, res, next) => {
            const {
                email, password
            } = req.body;

            if (!email || email.trim() === '') {
                return next(boom.create(400, 'Email must not be blank'));
            }
            if (!password || password.trim() === '') {
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
                                        .select('id', 'first_name', 'last_name', 'email')
                                        .where('email', email)
                                        .first()
                                        .then((result) => {
                                            res.set('Content-Type', 'application/json');
                                            const resultCamel = camelizeKeys(result);
                                            res.send(resultCamel);
                                        })
                                })
                        })
                        .catch((err) => {
                            next(err)
                        })


                })
              });

            module.exports = router;
