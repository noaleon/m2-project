# New Future

## Description

New Future is a platform to connect the best professional **artists** with the best **customers.**

## User stories

- Login - As a user I want to see a welcome page that displays 3 artists and 3 projects and gives me the option to either: explore the projects, log in as an existing user, or register with a new account.
- Register - As a user I want to register with my full information so that I can build my professional porfolio/dashboard or I want, as a customer, to reach the professional that best fits my project idea.
- Index - As a user I want to see the welcome page and be able to see the details of the projects and to contact with the artist.
- Explore - As a user I want to see displayed all the projects and be able to filter them by the category.
- User-profile - As a user I want to check my profile information -Full name, email, Profession, Location, Skills, Profile Image- and be able to edit it.
- Artist-profile - As an Artist (user) I want to check my profile information -Full name, email, Profession, Location, Skills, Profile Image-, be able to edit it, to check all their own Projects and to Create a New Project.
- Project-details - As a user I want to see the project's details: Project's Name, category, Artist's name, Project's description and Skills. In addition, I can Contact the artist and leave a Comment. As the owner of the Project I want to also be able to Edit or Delete it.
- Contact - As a user I want to fill a form with my email, subject and message to send to the Artist.
- Message - As a user I want to check the email sent and to go back to the Explore page.

## API routes (back-end)

- GET /
  finds 3 users that are artists
  finds 3 projects
  renders index.hbs

- GET /auth/register
  renders register.hbs

- POST /auth/register
  body:
    full name
    email
    password
    
- GET /auth/login
  renders login-layout.hbs

- POST /auth/login
  redirects to / if user logged in
  body:
  email
  password

- GET /auth/logout
  session.destroy
  redirects to /

- POST /homepage (search action)
  body:
  game-title
  console

- GET /game-search-results
  renders game-search-results.hbs
  includes the list of games
  redirects to / if user presses button

- GET /rent-form/:id
  renders rent-form.hbs
  redirects to /game-search-results if user presses button

- POST /rent-form/:id
  body:
  days
  price update

- GET /success
  renders success.hbs
  redirects to / if user presses button

- GET /profile
  renders user-profile.hbs
  redirects to / if user presses button

- POST /profile (to edit profile)
  redirects to /add-signup (we reuse it but for edit purposes)
  body:
  email
  password
  full name
  birthday
  gender
  address
  phone
  cardInfo
  typeOfCard
  cardNumber
  expDate
  CVV

- POST /profile (to add game)
  body:
  game title
  console
  price
  max days of rent

- GET /profile
  renders user-profile.hbs updated
  redirects to / if user presses button

- GET /notifications
  renders notifications.hbs
  redirects to / if user presses button

- GET /success (for renter)
  renders success.hbs
  redirects to /notifications if user presses button

## Models

### User

- User new Schema ({
    fullName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'artist'],
    },
    skills: [String],
    favorites: {
      type: [Schema.Types.ObjectId],
      ref: 'Project',
    },
    phoneNumber: Number,
    location: String,
    profession: String,
    image: String,
  },
  { timestamps: true }
);

### Project

- Project new Schema ({
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
      image: String,
      comments: [String],
    },
    { timestamps: true }
  );

## Backlog

- Confirmation.hbs
  Summary of product
  Confirmation button

- User profile
  Wishlist
  Check who is renting my game in the games list
  Who favorited the games posted

- Success
  Contact button besides the 'go home' to call the other user

- Homepage
  Filter part on the search

## Links

### Deploy

[New Future](https://clumsy-snaps-ant.cyclic.app/)

### Git

[Git Repository](https://github.com/li0nh4z3/m2-project)

### Slides

[Canva](https://www.canva.com/design/DAFeAGspR8I/6y2KDF900bNvXyScHMUJ0g/edit?utm_content=DAFeAGspR8I&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
