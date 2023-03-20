const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/User.model');
const Project = require('../models/Project.model');

const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  User.find({ role: 'artist' })
    .limit(3)
    .then((artists) => {
      Project.find()
        .limit(3)
        .then((projects) => {
          res.render('index', { projects, artists });
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

module.exports = router;
