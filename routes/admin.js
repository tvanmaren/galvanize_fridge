'use strict';

/* eslint-disable camelcase*/

const express = require('express');
const ev = require('express-validation');

// eslint-disable-next-line new-cap
const router = express.Router();

const knex = require('../knex');

const {
  camelizeKeys,
  decamelizeKeys
} = require('humps');

const boom = require('boom');

module.exports = router;
