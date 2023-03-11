const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User.model');

// require (import) middleware functions
const {
  loggedIn,
  loggedOut,
  isArtist,
} = require('../middleware/route-guard.js');

//////////// L O G I N ///////////

// GET route ==> to display the login form to users

//                 .: ADDED :.
router.get('/login', loggedOut, (req, res) => res.render('login-layout'));

//     POST login route ==> to process form data
//                 .: ADDED :.
router.post('/login', loggedOut, (req, res, next) => {
  console.log('SESSION =====> ', req.session);
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.render('login-layout', {
      errorMessage: 'Please enter both, email and password to login.',
      layout: 'login-layout.hbs',
    });
    return;
  }

  User.findOne({ email }) // <== check if there's user with the provided email
    .then((user) => {
      // <== "user" here is just a placeholder and represents the response from the DB
      if (!user) {
        // <== if there's no user with provided email, notify the user who is trying to login
        res.render('login-layout', {
          errorMessage: 'Email is not registered. Try with other email.',
          layout: 'login-layout.hbs',
        });
        return;
      }
      // if there's a user, compare provided password
      // with the hashed password saved in the database
      else if (bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.redirect('/welcome-user');
      } else {
        // if the two passwords DON'T match, render the login form again
        // and send the error message to the user
        res.render('login-layout', {
          errorMessage: 'Incorrect password.',
          layout: 'login-layout.hbs',
        });
      }
    })
    .catch((error) => next(error));
});

//   end of Noa's code

// added loggedIn condition
router.get('/user-profile/:id', loggedIn, (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (user.role === 'artist') {
        res.render('artists/artist-profile', user);
      } else {
        res.render('users/user-profile', user);
      }
    })
    .catch((error) => next(error));
});

router.post("/logout", loggedIn, (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;