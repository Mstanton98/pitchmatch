'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
let callback = process.env.NODE_ENV === 'production' ? 'https://pitchmatch.herokuapp.com/api/facebook/callback' : 'http://localhost:8000/api/facebook/callback';

const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { camelizeKeys, decamelizeKeys } = require('humps');
const request = require('request');

const router = express.Router();

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: callback
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate(function(err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
  return knex('users')
    .where('facebook_id', profile.id)
    .first()
    .then((user) => {
      if (user) {
        return user;
      }
      return knex('users')
      .insert(decamelizeKeys({
        firstName: profile.familyName,
        lastName: profile.givenName,
        email: profile.emails.value,
        facebookId: profile.id
      }))
    })
}));

router.get('/api/facebook', passport.authenticate('facebook'));

router.get('/api/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', failureRedirect: '/login'
  }), (req, res) => {
    const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: '2 weeks'
    });

    res.cookie('token', token, {
      httpOnly: true,
      expires: expiry,
      secure: router.get('env') === 'production'
    });

    res.redirect('/');
});

module.exports = router;
