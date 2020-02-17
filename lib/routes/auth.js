const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');

const setCookieAndSendUser = (res, user) => {
  res.cookie('session', user.setAuthToken(), {
    maxAge: 1000 * 60 * 60 * 24
  });
  res.send(user);
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => setCookieAndSendUser(res, user))
      .catch(next);
  })
  .post('/login', (req, res, next) => {
    User
      .authenticate(req.body)
      .then(user => setCookieAndSendUser(res, user))
      .catch(next);
  })
  .get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user)
      .catch(next);
  });
