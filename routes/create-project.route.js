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

// WORKING ON CREATE PROJECT ROUTER POST - NOT DONE

router.post(
  '/create-project',
  loggedIn,
  fileUploader.single('image'),
  (req, res, next) => {
    const { profession, description, skills, image } = req.body;
    const data = {
      imageURL: req.file.path,
      profession,
      description,
      skills,
      image,
    };

    res.render('projects/project-details', data);
  },
);

module.exports = router;
