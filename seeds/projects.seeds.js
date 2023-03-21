const mongoose = require('mongoose');
const Project = require('../models/Project.model');
const User = require('../models/User.model');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;

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
            category: faker.name.jobType(),
            title: faker.name.jobTitle(),
            description: faker.lorem.paragraphs(),
            skills: [faker.name.jobTitle(), faker.name.jobTitle()],
            image: faker.image.abstract(640, 480, true),
          };

          projectsList.push(project);
        });

        Project.db.dropCollection('projects').then(() => {
          Project.create(projectsList)
            .then(() => {
              // Once the documents are created, close the DB connection
              return mongoose.connection.close();
            })
            .then(() => {
              // Once the DB connection is closed, print a message
              console.log('DB connection closed!');
            });
        });
      })
      .catch((error) => console.log(error));
  })
  .then((users) => {
    console.log('Users created:', users);
  })
  .catch((err) => {
    // log erros if they happen
    console.log(`An error occurred while creating users from the DB: ${err}`);
  });
