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

router.post('/api/messages', authorize, (req, res, next) => {
  const id = req.token.userId;
  const recipientId = req.body.recipientId;
  const message = req.body.message;

  return knex('user_messages')
    .insert(decamelizeKeys({
      userId: id,
      matchId: recipientId,
      messageBody: message
    }))
    .then((response) => {

      return knex('user_messages')
        .where('user_id', id)
        .andWhere('match_id', recipientId)
        .then((rows) => {
          const messages = camelizeKeys(rows);

          for (let i = 0; i < messages.length; i++) {
            delete messages[i].facebookToken;
          }

          res.send(messages);
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/api/messageList', authorize, (req, res, next) => {
  const id = req.token.userId;

  return knex('user_messages')
    .innerJoin('users', 'users.id', 'user_messages.match_id')
    .where('user_id', id)
    .orWhere('match_id', id)
    .then((rows) => {
      if (!rows) {
        return boom.create(404, 'User has no messages.');
      }

      const messages = camelizeKeys(rows);

      for (let i = 0; i < messages.length; i++) {
        delete messages[i].facebookToken;
      }

      res.send(messages);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/api/messages', authorize, (req, res, next) => {
  const id = req.token.userId;
  const recipientId = req.body.recipientId;
  const messages = {};

  knex('user_messages')
    .where('user_id', id)
    .andWhere('match_id', recipientId)
    .then((response) => {
      if (!response) {
        return boom.create(404, 'No messages from this user.')
      }

      messages.userId = id;
      messages.matchId = recipientId;

      return knex('user_messages')
        .del()
        .where('user_id', id)
        .andWhere('match_id', recipientId)
    })
    .then(() => {
      res.send((camelizeKeys(messages)));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
