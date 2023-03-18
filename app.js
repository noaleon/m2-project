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
- if user is logged in, redirect to user-profile when click on register


WORKING:
- style.css
- favorites

TO DO:
- create contact.hbs
<h1>NODEMAILER</h1>
<form action="/send-email" method="post">
  <label for="">Email</label>
  <input type="email" name="email" id="">
  <label for="">Subject</label>
  <input type="text" name="subject" id="">
  <label for="">Message</label>
  <textarea type="text" name="message" id=""></textarea>
  <button type="submit">Submit</button>
</form>
- create contact.routes.js
  - when user.role = 'user' > display CONTACT button on Artist profile
  - res.render contact.hbs

    (check Nodemailer self-guided lesson)
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'your email address',
          pass: 'your email password' 
        }
      });

      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'your email address',
          pass: 'your email password' 
        }
      });

      transporter.sendMail({
        from: '"My Awesome Project " <myawesome@project.com>',
        to: 'receiver@myawesomereceiver.com', 
        subject: 'Awesome Subject, 
        text: 'Awesome Message',
        html: '<b>Awesome Message</b>'
      })
      .then(info => console.log(info))
      .catch(error => console.log(error))

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
      router.post('/send-email', (req, res, next) => {
        let { email, subject, message } = req.body;
        res.render('message', { email, subject, message })
      });
    - create message/view.hbs
      <h1>Email sent</h1>
  
      <h2>Email</h2>
      {{email}}
      
      <h2>Subject</h2>
      {{subject}}
      
      <h2>Message</h2>
      {{message}}
      
- projects-list.hbs put filters by category 
- styles
- put a photo on home page
- put comments: description field / button comment 
- rename path's


*/
