const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User.model');
const router = express.Router();

const saltRounds = 10;

const {
  loggedIn,
  loggedOut,
  isArtist,
} = require('../middleware/route-guard.js');

//////////// R E G I S T E R ///////////

router.get('/auth/register', (req, res) => {
  res.render('register.hbs');
});

router.post('/auth/register', (req, res, next) => {
  const { fullName, email, password, user, artist } = req.body;

  // make sure users fill all mandatory fields:
  if (!fullName || !email || !password) {
    res.render('register', {
      errorMessage:
        'All fields are mandatory. Please provide your username, email and password.',
    });
    return;
  }

  // make sure passwords are strong:
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).render('register', {
      errorMessage:
        'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.',
    });
    return;
  }

  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        fullName,
        email,
        role: user ? 'user' : 'artist',
        password: hashedPassword,
      });
    })
    .then((userFromDB) => {
      req.session.user = userFromDB;
      res.redirect('/users/profile');
    })
    .catch((error) => {
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('register', { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render('register', {
          errorMessage:
            'Username and email need to be unique. Either username or email is already used.',
        });
      } else {
        next(error);
      }
    });
});

//////////// L O G I N ///////////

// GET route ==> to display the login form to users

router.get('/auth/login', loggedOut, (req, res) => res.render('login-layout'));

// POST login route ==> to process form data
router.post('/auth/login', loggedOut, (req, res, next) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.render('login-layout', {
      errorMessage: 'Please enter both, email and password to login.',
    });
    return;
  }

  User.findOne({ email }) // <== check if there's user with the provided email
    .then((user) => {
      // <== "user" here is just a placeholder and represents the response from the DB
      if (!user) {
        // <== if there's no user with provided email, notify the user who is trying to login
        res.render('login-layout.hbs', {
          errorMessage: 'Email is not registered. Try with other email.',
        });
        return;
      }
      // if there's a user, compare provided password
      // with the hashed password saved in the database
      else if (bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.redirect('/projects/explore');
      } else {
        // if the two passwords DON'T match, render the login form again
        // and send the error message to the user
        res.render('login-layout', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch((error) => next(error));
});

//////////// L O G O U T ///////////

router.get('/auth/logout', loggedIn, (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
