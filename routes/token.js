'use strict';

/* eslint-disable camelcase*/

const express = require('express');
const ev = require('express-validation');
const dotenv = require('dotenv').config();
// const validations = require('../validations/books');

// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const bcrypt=require('bcrypt-as-promised');
const app = require('../server.js');

const {
  camelizeKeys,
  decamelizeKeys
} = require('humps');

const boom = require('boom');

router.post('/token', function(req,res, next){
  knex('users')
  .where('email', req.body.email)
  .first()
  .then((rows) =>{
    const users = camelizeKeys(rows);
    if (!users) {
      res.json({ success: false, message: 'Login failed. User not found '});
    }
    req.body.hashedPassword=req.body.password;
    if (users.hashedPassword !== req.body.hashedPassword){
      res.json({ success: false, message: 'Login failed. User not found '});
    }
    else{
      // const expiry = new Date(Date.now() + 1000 * 60 * 1 * 1); // 1 minute
      const token = jwt.sign({ userId: users.id, exp: Math.floor(Date.now()/1000)+(60 * 1) }, process.env.JWT_SECRET);
      // next();

      // res.cookie('token', token, {
      //   httpOnly: true,
      //   expires: expiry,
      //   secure: router.get('env') === 'production'
      // });

      req.body.token = token;
      res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
      });
    }
    })
    .catch((err) => {
    next(err);
    });
  });

  // router.use(function(req,res,next){
  //   var token = req.body.token || req.query.token || req.headers['x-access-token'];
  //   if(token){
  //     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //     if (err) {
  //       return res.send(false);
  //     }
  //     req.decoded = decoded;
  //     // res.send(true);
  //     next();
  //     });
  //   }
  //   else{
  //     return res.status(403).send({
  //       success: false,
  //       message: 'No token provided.'
  //     });
  //   }
  // });

module.exports = router;
