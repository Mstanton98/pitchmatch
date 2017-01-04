'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
let callback = process.env.NODE_ENV === 'production' ? 'https://pitchmatch.herokuapp.com/api/facebook/callback' : 'http://localhost:8000/api/facebook/callback';

const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const boom = require('boom');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { camelizeKeys, decamelizeKeys } = require('humps');
const request = require('request-promise');

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

router.post('/api/auth', (req, res, next) => {
  const accessToken = req.body.accessToken;
  let fbProfile = null;
  let fbUser = {};

  request({url: `https://graph.facebook.com/v2.8/me?fields=id%2Cfirst_name%2Clast_name&access_token=${accessToken}`})
  .then((res) => {
    fbProfile = JSON.parse(res);

    fbUser = {
      firstName: fbProfile.first_name,
      lastName: fbProfile.last_name,
      facebookId: fbProfile.id,
      facebookToken: accessToken
    };

    return request({
      url: `http://graph.facebook.com/${fbProfile.id}/picture?type=large&redirect=false&width=480&height=480`
    })
  })
  .then((response) => {
    const data = JSON.parse(response);

    fbUser.imgUrl = data.data.url;

    console.log(fbUser.imgUrl);

  })
  .then((user) => {
    if (user) {
      return user;
    }

    return knex('users')
    .insert(decamelizeKeys(fbUser), '*')
  })
  .then((newUser) => {
    const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 60);
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '60d'
    });

    res.cookie('token', token, {
      httpOnly: true,
      expires: expiry,
      secure: router.get('env') === 'production'
    });
  })
  .catch((err) => {
    next(err);
  })
});

router.get('/api/users', authorize, (req, res, next) => {
  return knex('users')
  .whereNot('id', req.token.userId)
  .then((response) => {
    if (!response) {
      return next(boom.create(400, 'Failed to serve users.'));
    }

    const users = camelizeKeys(response);

    res.send(users);
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
