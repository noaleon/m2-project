const mongoose = require('mongoose');
const User = require('../models/User.model');

const MONGO_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/m2-project';

//22 USERS data with fullName, email and password
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
  {
    fullName: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    password: 'secret321',
    role: 'user',
  },
  {
    fullName: 'David Lee',
    email: 'david.lee@example.com',
    password: 'password123',
    role: 'user',
  },
  {
    fullName: 'Emma Davis',
    email: 'emma.davis@example.com',
    password: 'qwerty',
    role: 'user',
  },
  {
    fullName: 'Frank Wilson',
    email: 'frank.wilson@example.com',
    password: 'letmein',
    role: 'user',
  },
  {
    fullName: 'Grace Taylor',
    email: 'grace.taylor@example.com',
    password: 'password1',
    role: 'user',
  },
  {
    fullName: 'Henry Martin',
    email: 'henry.martin@example.com',
    password: 'password1234',
    role: 'user',
  },
  {
    fullName: 'Isabella Lee',
    email: 'isabella.lee@example.com',
    password: 'mypassword',
    role: 'user',
  },
  {
    fullName: 'Jack Robinson',
    email: 'jack.robinson@example.com',
    password: 'password123',
    role: 'user',
  },
  {
    fullName: 'Karen Baker',
    email: 'karen.baker@example.com',
    password: 'abc123',
    role: 'user',
  },
  {
    fullName: 'Liam Young',
    email: 'liam.young@example.com',
    password: 'password1234',
    role: 'user',
  },
  {
    fullName: 'Mia Hernandez',
    email: 'mia.hernandez@example.com',
    password: 'password5678',
    role: 'user',
  },
  {
    fullName: 'Nathan Davis',
    email: 'nathan.davis@example.com',
    password: 'password9876',
    role: 'user',
  },
  {
    fullName: 'Olivia Rodriguez',
    email: 'olivia.rodriguez@example.com',
    password: 'password789',
    role: 'user',
  },
  {
    fullName: 'Peter Lewis',
    email: 'peter.lewis@example.com',
    password: 'password1',
    role: 'user',
  },
  {
    fullName: 'Quinn Jackson',
    email: 'quinn.jackson@example.com',
    password: 'mypassword',
    role: 'user',
  },
  {
    fullName: 'Ryan Garcia',
    email: 'ryan.garcia@example.com',
    password: 'letmein',
    role: 'user',
  },
  {
    fullName: 'Sophia Davis',
    email: 'sophia.davis@example.com',
    password: 'qwerty123',
    role: 'user',
  },
  {
    fullName: 'Taylor Lee',
    email: 'taylor.lee@example.com',
    password: 'password1234',
    role: 'user',
  },
  {
    fullName: 'Uma Patel',
    email: 'uma.patel@example.com',
    password: 'password567',
    role: 'user',
  },
  {
    fullName: 'Victoria Nguyen',
    email: 'victoria.nguyen@example.com',
    password: 'password999',
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
  {
    fullName: 'Uma Lee',
    email: 'uma.lee@example.com',
    password: 'passwordghi3',
    role: 'artist',
  },
];

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
