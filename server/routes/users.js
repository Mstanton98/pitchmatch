'use strict';

// eslint-disable-next-line new-cap

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const request = require('request');
const jwt = require('jsonwebtoken');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.token = decoded;
    next();
  });
};

router.get('/api/users', authorize, (req, res, next) => {
  const id = req.token.userId;
  console.log(id);
//select all matches where user id is you
//push match ids into array
//get all users
//for blah if
  return knex('users')
  .outerJoin('user_matches', 'users.id', 'user_matches.user_id')
    .select('users.id', 'first_name', 'last_name', 'img_url', 'bio', 'instruments', 'project_type' )
    .where('user_id', id)
    // .whereNot('user.id', 'user_matches.user_id')
    // .andWhereNot('bio', null)
    .then((rows) => {

      console.log(rows);
      res.send(camelizeKeys(rows));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
