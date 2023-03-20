const express = require('express');
const bcrypt = require('bcrypt');
const fileUploader = require('../config/cloudinary.config');
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
    User.findById(req.session.user._id).then((user) => {
      Project.find({ owner: req.session.user._id })
        .then((projects) =>
          res.render('artists/artist-profile', { user, projects }),
        )
        .catch((err) => next(err));
    });
  } else {
    User.findById(req.session.user._id).then((user) => {
      res.render('users/user-profile', user);
    });
  }
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
    .then((user) => {
      if (user.role === 'user') {
        res.render('users/edit-user-profile', user);
      } else {
        res.render('artists/edit-artist-profile', user);
      }
    })
    .catch((err) => next(err));
});

router.post(
  '/users/edit',
  loggedIn,
  fileUploader.single('image'),
  (req, res, next) => {
    const { fullName, profession, location, skills } = req.body;

    const user = {
      fullName: fullName || undefined,
      profession: profession || undefined,
      location: location || undefined,
      skills: skills ? skills.split(', ') : undefined,
      image: req.file ? req.file.path : undefined,
    };

    User.findByIdAndUpdate(req.session.user._id, user, { new: true })
      .then((editedUser) => {
        res.redirect('/users/profile');
      })
      .catch((err) => next(err));
  },
);

//////////// F A V O R I T E   P R O J E C T S   B Y  U S E R ///////////

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

//////////// S E N D   M E S S A G E ///////////
router.get('/send-email', (req, res) => {
  res.render('contact')
})

router.post('/send-email', (req, res, next) => {
  let { email, subject, message } = req.body;
  res.render('message', { email, subject, message })
});

router.post('/send-email', (req, res, next) => {
  let { email, subject, message } = req.body;
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your email address',
      pass: 'your email password'
    }
  });
  transporter.sendMail({
    from: '"My Awesome Project " <myawesome@project.com>',
    to: email, 
    subject: subject, 
    text: message,
    html: `<b>${message}</b>`
  })
  .then(info => res.render('message', {email, subject, message, info}))
  .catch(error => console.log(error));
});

module.exports = router;
