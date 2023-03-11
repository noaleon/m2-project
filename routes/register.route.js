const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User.model');
const router = express.Router();

const saltRounds = 10;

router.get('/register', (req, res) => {
  res.render('register.hbs');
});

router.post('/register', (req, res, next) => {
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
      res.redirect(`user-profile/${userFromDB.id}`);
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

module.exports = router;
