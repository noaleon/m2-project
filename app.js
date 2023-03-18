// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config/session.config')(app);
require('./config')(app);

// default value for title local
const capitalize = require('./utils/capitalize');
const projectName = 'm2-project';

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

//create this to show the images
app.use(express.static('public/images'));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use('*', (req, res, next) => {
  app.locals.user = req.session.user;
  next();
});

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes');
app.use('/', indexRoutes);

const authRoute = require('./routes/auth.routes');
app.use('/', authRoute);

const userRoute = require('./routes/user.routes');
app.use('/', userRoute);

const projectRoute = require('./routes/project.routes');
app.use('/', projectRoute);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

/*
DONE: (missing the styles)
- Project and User model
- Seeds with user and artist
- Register route
- Index route
- Register hbs
- Login-layout hbs
- Login router
- Populate seeds.js with the projects
- Logout router
- Middlewares
- Login route / login.hbs
- Do the login / logout button appear or disappear
- User route / user-profile.hbs
- Do the artists/create-project


WORKING:
- style.css
- favorites
- put comments: description field / button comment 

TO DO:
- projects-list.hbs put filters by category 
- if user is logged in, redirect to user-profile when click on register
- styles
- put a photo on home page
     


*/
