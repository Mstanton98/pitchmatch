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

router.get('/api/matches', authorize, (req, res, next) => {
  const id = req.token.userId;

  return knex('user_matches')
    .innerJoin('users', 'users.id', 'user_matches.match_id')
    .where('user_id', id)
    .andWhere('is_match', true)
    .then((rows) => {
      const matches = camelizeKeys(rows);

      for (let i = 0; i < matches.length; i++) {
        delete matches[i].facebookToken;
      }

      res.send(matches);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/api/matches', authorize, (req, res, next) => {
  const id = req.token.userId;
  const matchId = req.body.matchId;

  knex('user_matches')
    .where('match_id', id)
    .andWhere('user_id', matchId)
    .then((rows) => {
      if (rows.length !== 0) {

        return knex('user_matches')
          .where('match_id', id)
          .andWhere('user_id', matchId)
          .update({'is_match': true})
          .then(() => {

            knex('user_matches')
              .insert(decamelizeKeys({
                userId: id,
                matchId: matchId,
                isMatch: true
              }))
              .then((row) => {

                res.send(true);
              })
              .catch((err) => {
                next(err);
              });
          })
          .catch((err) => {
            next(err);
          });
      }
      else {
        return knex('user_matches')
          .insert(decamelizeKeys({
            userId: id,
            matchId: matchId,
            isMatch: false
          }))
          .then((response) => {

            res.send(false);
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      next(err)
    });
});

router.delete('/api/matches', authorize, (req, res, next) => {
  const id = req.token.userId;
  const matchId = req.body.matchId;
  const match = {};

  knex('user_matches')
    .where('user_id', id)
    .andWhere('match_id', matchId)
    .orWhere('user_id', matchId)
    .andWhere('match_id', id)
    .then((response) => {
      if (!response) {
        return boom.create(404, 'Match not found.')
      }

      match.userId = id;
      match.matchId = matchId;

      return knex('user_matches')
        .del()
        .where('user_id', id)
        .andWhere('match_id', matchId)
        .orWhere('user_id', matchId)
        .andWhere('match_id', id)
    })
    .then(() => {
      res.send((camelizeKeys(match)));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
