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

router.get('/project/:projectId/edit', loggedIn, isArtist, (req, res) => {
  const { projectId } = req.params;

  Project.findById(projectId).then((project) => {
    res.render('projects/project-edit', { project });
  });
});

router.get('/projects/project-details', loggedIn, isArtist, (req, res) => {
  const { projectId } = req.params;

  Project.findById(projectId).then((project) => {
    res.render('projects/project-edit', { project });
  });
});

//WORKING ON EDIT ROUTER
router.post(
  '/project/:projectId/edit',
  loggedIn,
  isArtist,
  fileUploader.single('image'),
  (req, res, next) => {
    const { title, category, description, skills } = req.body;
    const { projectId } = req.params;

    const project = {
      owner: req.session.user._id,
      category,
      title,
      description,
      skills: skills.split(', '),
      image: req.file.path,
    };

    Project.findByIdAndUpdate(
      projectId,
      { title, category, description, skills },
      { new: true },
    )
      .then((newProject) => res.redirect('projects/project-details'))
      .catch((err) => next(err));
  },
);

module.exports = router;

//EXEMPLE CODE

// router.get('/movies/:id/edit', (req, res, next) => {
//   Movie.findById(req.params.id).then((movie) => {
//     Celebrity.find()
//       .then((celebrities) => {
//         res.render('movies/edit-movie.hbs', { movie, celebrities });
//       })
//       .catch((error) => console.error(error));
//   });
// });

// router.post('/movies/:id/edit', (req, res, next) => {
//   const { id } = req.params;
//   const { title, genre, plot, cast } = req.body;

//   Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
//     .then((updatedMovie) => {
//       console.log(updatedMovie);
//       console.log(`Movie ${updatedMovie.title} updated.`);
//       res.redirect('/movies');
//     })
//     .catch((error) => console.error(error));
// });
