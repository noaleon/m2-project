const express = require('express');
const User = require('../models/User.model');
const Project = require('../models/Project.model');
const router = express.Router();

// require (import) middleware functions
const {
  loggedIn,
  loggedOut,
  isArtist,
} = require('../middleware/route-guard.js');

// WORKING ON EDIT PROFILE - NOT DONE
router.get('/edit-profile', loggedIn, (req, res, next) => {
  res.render('artists/edit-profile');
});

module.exports = router;
