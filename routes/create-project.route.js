const express = require('express');
const User = require('../models/User.model');
const Project = require('../models/Project.model');
const fileUploader = require('../config/cloudinary.config');
const router = express.Router();

// require (import) middleware functions
const {
  loggedIn,
  loggedOut,
  isArtist,
} = require('../middleware/route-guard.js');

router.get('/create-project', loggedIn, (req, res, next) => {
  res.render('artists/create-project');
});

router.post(
  '/create-project',
  loggedIn,
  isArtist,
  fileUploader.single('image'),
  (req, res, next) => {
    const { title, category, description, skills } = req.body;

    const project = {
      owner: req.session.user._id,
      category,
      title,
      description,
      skills: skills.split(', '),
      image: req.file.path,
    };

    Project.create(project)
      .then((project) => res.render('projects/project-details', project))
      .catch((err) => next(err));
  },
);

module.exports = router;
