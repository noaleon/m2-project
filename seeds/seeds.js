const mongoose = require('mongoose');
const User = require('../models/User.model');

const MONGO_URI = process.env.MONGODB_URI;

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
  },
  {
    fullName: 'Diogo Lee',
    email: 'diogo.lee@example.com',
    password: 'password321',
    role: 'artist',
  },
  {
    fullName: 'Emily Chen',
    email: 'emily.chen@example.com',
    password: 'password654',
    role: 'artist',
  },
  {
    fullName: 'Frank Wang',
    email: 'frank.wang@example.com',
    password: 'password987',
    role: 'artist',
  },
  {
    fullName: 'Grace Kim',
    email: 'grace.kim@example.com',
    password: 'passwordabc',
    role: 'artist',
  },
  {
    fullName: 'Henry Liu',
    email: 'henry.liu@example.com',
    password: 'passworddef',
    role: 'artist',
  },
  {
    fullName: 'Isabella Davis',
    email: 'isabella.davis@example.com',
    password: 'passwordghi',
    role: 'artist',
  },
  {
    fullName: 'Jack Brown',
    email: 'jack.brown@example.com',
    password: 'passwordjkl',
    role: 'artist',
  },
  {
    fullName: 'Katherine Lee',
    email: 'katherine.lee@example.com',
    password: 'passwordmno',
    role: 'artist',
  },
  {
    fullName: 'Liam Nielson',
    email: 'liam.nielson@example.com',
    password: 'passwordpqr',
    role: 'artist',
  },
  {
    fullName: 'Melissa Johnson',
    email: 'melissa.johnson@example.com',
    password: 'passwordstu',
    role: 'artist',
  },
  {
    fullName: 'Noah Brown',
    email: 'noah.brown@example.com',
    password: 'passwordvwx',
    role: 'artist',
  },
  {
    fullName: 'Olivia Chen',
    email: 'olivia.chen@example.com',
    password: 'passwordyz1',
    role: 'artist',
  },
  {
    fullName: 'Peter Wang',
    email: 'peter.wang@example.com',
    password: 'password234',
    role: 'artist',
  },
  {
    fullName: 'Queen Kim',
    email: 'queen.kim@example.com',
    password: 'password567',
    role: 'artist',
  },
  {
    fullName: 'Ryan Liu',
    email: 'ryan.liu@example.com',
    password: 'password890',
    role: 'artist',
  },
  {
    fullName: 'Samantha Davis',
    email: 'samantha.davis@example.com',
    password: 'passwordabc1',
    role: 'artist',
  },
  {
    fullName: 'Tyler Brown',
    email: 'tyler.brown@example.com',
    password: 'passworddef2',
    role: 'artist',
  },
];

//CREATE HERE DATA FOR THE PROJECTS

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
  })
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
