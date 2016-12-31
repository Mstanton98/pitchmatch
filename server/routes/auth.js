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

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: callback,
  profileFields: ['name', 'photos']
},
function(accessToken, refreshToken, profile, done) {
  let fbProfile = null;

  request({
    url: `http://graph.facebook.com/${profile.id}/picture?type=large&redirect=false&width=480&height=480`
  })
  .then((res) => {
    fbProfile = JSON.parse(res);

    return knex('users')
    .where('facebook_id', profile.id)
    .first();
  })
  .then((user) => {
    if (user) {
      return user;
    }

    return knex('users')
    .insert(decamelizeKeys({
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      imgUrl: fbProfile.data.url,
      facebookId: profile.id,
      facebookToken: accessToken
    }), '*');
  })
  .then((user) => {
    done(null, camelizeKeys(user));
  })
  .catch((err) => {
    done(err);
  });
}));

router.get('/api/facebook', passport.authenticate('facebook', { session: false }));

router.get('/api/facebook/callback', passport.authenticate('facebook', {
  session: false,
  failureRedirect: '/'
}), (req, res) => {
  const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 60);
  const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: '60d'
  });

  res.cookie('token', token, {
    httpOnly: true,
    expires: expiry,
    secure: router.get('env') === 'production'
  });

  res.redirect('/');
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
