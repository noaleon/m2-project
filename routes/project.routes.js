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

//////////// G E T   A L L   P R O J E C T S ///////////
router.get('/projects/explore', (req, res) => {
  Project.find()
    .then((projects) => {
      res.render('projects/projects-list', { projects });
    })
    .catch((error) => console.error(error));
});

//////////// C R E A T E   P R O J E C T S ///////////
router.get('/projects/create', loggedIn, (req, res, next) => {
  res.render('artists/create-project');
});

router.post(
  '/projects/create',
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
      image: req.file && req.file.path,
    };

    Project.create(project)
      .then((project) => res.redirect(`/projects/${project.id}`))
      .catch((err) => next(err));
  },
);

//////////// G E T   O N E   P R O J E C T ///////////
router.get('/projects/:id', loggedIn, (req, res, next) => {
  const { id } = req.params;

  Project.findById(id)
    .populate('owner')
    .then((project) => {
      const isProjectOwner = req.session.user._id === project.owner.id;
      const projectWithOwner = { ...project.toObject(), isProjectOwner };

      res.render('projects/project-details', projectWithOwner);
    })
    .catch((err) => next(err));
});

//////////// E D I T   P R O J E C T ///////////
router.get('/projects/:projectId/edit', loggedIn, isArtist, (req, res) => {
  const { projectId } = req.params;

  Project.findById(projectId).then((project) => {
    res.render('projects/project-edit', project);
  });
});

router.post(
  '/projects/:projectId/edit',
  loggedIn,
  isArtist,
  fileUploader.single('image'),
  (req, res, next) => {
    const { title, category, description, skills } = req.body;
    const { projectId } = req.params;

    const project = {
      owner: req.session.user._id,
      category: category || undefined,
      title: title || undefined,
      description: description || undefined,
      skills: skills ? skills.split(', ') : undefined,
      image: req.file ? req.file.path : undefined,
    };

    Project.findByIdAndUpdate(projectId, project, { new: true })
      .then((editedProject) => res.redirect(`/projects/${editedProject.id}`))
      .catch((err) => next(err));
  },
);

//////////// D E L E T E   P R O J E C T ///////////
router.get(
  '/projects/:projectId/delete',
  loggedIn,
  isArtist,
  (req, res, next) => {
    const { projectId } = req.params;

    Project.findByIdAndDelete(projectId)
      .then(() => {
        res.redirect('/users/profile');
      })
      .catch((err) => next(err));
  },
);

//////////// P O S T  C O M M E N T ///////////
router.post('/projects/:id/comments', loggedIn, (req, res, next) => {
  const { comment } = req.body;
  const { id } = req.params;

  Project.findByIdAndUpdate(id, { $push: { comments: comment } })
    .then((comment) => res.redirect(`/projects/${comment.id}`))
    .catch((err) => next(err));
});

module.exports = router;
