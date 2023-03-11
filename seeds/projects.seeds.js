const mongoose = require('mongoose');
const Project = require('../models/Project.model');
const User = require('../models/User.model');
const { faker } = require('@faker-js/faker');

const MONGO_URI = 'mongodb://127.0.0.1:27017/m2-project';

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);
  })
  .then(() => {
    User.find()
      .then((users) => {
        let projectsList = [];

        users.forEach((user) => {
          const project = {
            owner: user.id,
            category: faker.commerce.product(),
            title: faker.animal.cat(),
            description: faker.hacker.phrase(),
            skills: [faker.color.rgb(), faker.color.rgb()],
          };

          projectsList.push(project);
        });

        Project.create(projectsList);
      })
      .catch((error) => console.log(error));
  })
  .then((users) => {
    console.log('Users created:', users);
  })
  .then(() => {
    // Once the documents are created, close the DB connection
    // return mongoose.connection.close();
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log('DB connection closed!');
  })
  .catch((err) => {
    // log erros if they happen
    console.log(`An error occurred while creating users from the DB: ${err}`);
  });

// {
//   fullName: 'Jesus Dias',
//   email: 'jesus.dias@example.com',
//   password: 'password789',
//   role: 'artist',
//   // projects: [ {owner: '',}]
// },

// .then((artists) => {
//   console.log('Artists created:', artists);
//    if (artists.projects.length > 0) { artists.projects.forEach(project => { return Project.create(project) }) }
// })
// .then(() => {
//   return Project.create(projects)
// })
// .then((projects) => {
//   console.log('Artists created:', projects);
// })

// should we create the data inside the artist data ?
