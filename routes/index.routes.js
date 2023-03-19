const express = require('express');
const User = require('../models/User.model');
const Project = require('../models/Project.model');

const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  // User.find({ role: 'artist' })
  //   .limit(3)
  //   .then((artists) => res.render('index', { artists }))
  //   .catch((error) => next(error));

  Project.find()
    .limit(3)
    .then((projects) => {
      res.render('index', { projects });
    })
    .catch((error) => next(error));
});

module.exports = router;
