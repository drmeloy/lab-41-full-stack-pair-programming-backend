const Router = require('express');
const Profile = require('../models/Profile');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Profile
      .create(req.body)
      .then(profile => {
        return Profile
          .findByIdAndUpdate(profile._id, { userId: req.user._id }, { new: true });
      })
      .then(profile => res.send(profile))
      .catch(next);
  })
  .get('/all', ensureAuth, (req, res, next) => {
    Profile
      .find()
      .then(profiles => res.send(profiles))
      .catch(next);
  })
  .get('/user', ensureAuth, (req, res, next) => {
    Profile
      .findOne({ userId: req.user._id })
      .then(profile => res.send(profile))
      .catch(next);
  });
