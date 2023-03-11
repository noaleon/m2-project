const mongoose = require('mongoose');
const User = require('../models/User.model');
// require project model
const Project = require('../models/Project.model')

const MONGO_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/m2-project';

//2 USERS data with fullName, email and password
const users = [
  {
    fullName: 'Alice Smith',
    email: 'alice.smith@example.com',
    password: '123456',
    role: 'user',
  },
  {
    fullName: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    password: 'password123',
    role: 'user',
  },
];

//22 ARTISTS data with fullName, email and password
// deleted some artists and edited the reminders
const artists = [
  {
    fullName: 'Joana Mendes',
    email: 'joana.mendes@example.com',
    password: 'password123',
    role: 'artist',
  },
  {
    fullName: 'Joe Jones',
    email: 'joe.jones@example.com',
    password: 'password456',
    role: 'artist',
  },
  {
    fullName: 'Jesus Dias',
    email: 'jesus.dias@example.com',
    password: 'password789',
    role: 'artist',
    // projects: [ {owner: '',}]
  },
];

//CREATE HERE DATA FOR THE PROJECTS
// should we create the data inside the artist data ?

// connect to the database
mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);
  })
  .then(() => {
    // Create new documents in the users collection with 'user' role
    return User.create(users);
  })
  .then((users) => {
    console.log('Users created:', users);

    // Create new documents in the users collection with 'artist' role
    return User.create(artists);
  })
  .then((artists) => {
    console.log('Artists created:', artists);
    // if (artists.projects.length > 0) { artists.projects.forEach(project => { return Project.create(project) }) }
  })
  // .then(() => {
  //   return Project.create(projects)
  // })
  // .then((projects) => {
  //   console.log('Artists created:', projects);
  // })
  .then(() => {
    // Once the documents are created, close the DB connection
    return mongoose.connection.close();
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log('DB connection closed!');
  })
  .catch((err) => {
    // log erros if they happen
    console.log(`An error occurred while creating users from the DB: ${err}`);
  });
