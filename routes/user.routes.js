const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User.model');
const Project = require('../models/Project.model');

// require (import) middleware functions
const {
  loggedIn,
  loggedOut,
  isArtist,
} = require('../middleware/route-guard.js');

//////////// U S E R  P R O F I L E ///////////

router.get('/users/profile', loggedIn, (req, res, next) => {
  const { user } = req.session;

  if (user.role === 'artist') {
    Project.find({ owner: req.session.user._id })
      .then((projects) =>
        res.render('artists/artist-profile', { user, projects }),
      )
      .catch((err) => next(err));
  } else {
    res.render('users/user-profile', user);
  }
});

// GET LOGGED USER PROJECTS
router.get('/users/projects', loggedIn, (req, res, next) => {
  Project.find({ owner: req.session.user._id })
    // .then((projects) => res.render('mubaieughaiue hsb', { projects: projects }))
    .then((projects) => res.json(projects))
    .catch((err) => next(err));
});

// GET SPECIFIC USER PROJECTS
router.get('/users/:id/projects', loggedIn, (req, res, next) => {
  const { id } = req.params;
  Project.find({ owner: id })
    .then((projects) => res.json(projects))
    .catch((err) => next(err));

  res.render('artists/create-project');
});

//////////// E D I T   P R O F I L E ///////////
router.get('/users/edit', loggedIn, (req, res, next) => {
  User.findById(req.session.user._id)
    .then((user) => res.render('view de form de edicao do user', user))
    .catch((err) => next(err));
});

router.post('/users/edit', loggedIn, (req, res, next) => {
  const { fullName, profession } = req.body;

  const user = {
    fullName: fullName || undefined,
    profession: profession || undefined,
  };

  User.findByIdAndUpdate(req.session.user._id, user, { new: true })
    .then(() => res.redirect('/users/profile'))
    .catch((err) => next(err));
});

router.post('/users/projects/favorites/:id', loggedIn, (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndUpdate(
    req.session.user._id,
    {
      $push: { favorites: id },
    },
    { new: true },
  )
    .then((user) => {
      res.json(user);
    })
    .catch((err) => next(err));
});

module.exports = router;
