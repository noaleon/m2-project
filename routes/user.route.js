const express = require('express');
const router = express.Router();
const User = require('../models/User.model');

router.get('/user-profile/:id', (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => res.render('users/user-profile', user))
    .catch((error) => next(error));
});

module.exports = router;
