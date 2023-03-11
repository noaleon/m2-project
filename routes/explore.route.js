const express = require('express');
const router = express.Router();
const Project = require('../models/Project.model');

router.get('/explore', (req, res) => {
  Project.find()
    .then((projects) => {
      res.render('projects/projects-list', { projects });
    })
    .catch((error) => console.error(error));
});

module.exports = router;
