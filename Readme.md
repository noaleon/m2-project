# New Future

Naruto loves to eat ramen! In this game you have to help Naruto eat as much ramen as he can.

## Description

New Future, is a platform to connect **artist** with the best **new customers.**

## User stories

- 404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- 500 - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- login-signup - As a user I want to see a welcome page that gives me the option to either log in as an existing user, or sign up with a new account.
- add-signup - As a user I want to sign up with my full information so that I can safely rent video games from people.
- homepage - As a user I want to see a notifications preview and be able to either search a video game by console, or go to my profile from the home page.
- game-search-results - As a user I want to see the search results with a oreview image, the title, the console it's for, and the price of rent per day. Also, to go back to the home page if I don't want to see that search anymore.
- game-rent-form - As a user I want to see more information about the game when I click on a certain item, the renter's general location, and to choose how many days I want to rent a game. Also, to go back to the search results page if I don't want to see that item anymore.
- success - As a user I want to see a success page that details the contact information with the renter and confirmation of the general information of the game I just rented. Also, to go back to the home page when I'm done.
- user-profile - As a user I want to check my profile information and be able to edit it, and add new games to my renting library. Also, to go back to the home page if I don't want to see the profile anymore.
- notifications - As a user I want to check my notifications in-depth, to see who has rented my game and games I have rented.

## API routes (back-end)

- GET /
  renders login-signup.hbs

- GET /auth/signup
  redirects to / if user logged in
  renders add-signup.hbs

- POST /auth/signup
  redirects to / if user logged in
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

- POST /auth/login
  redirects to / if user logged in
  body:
  email
  password

- POST /auth/logout
  body: (empty)

- GET /
  renders homepage.hbs (the profile preview + search form)

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

- User new Schema (
  {
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
  image: {
  type: String,
  },
  },
  {
  timestamps: true,
  },
  );

  - Project new Schema (
    {
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
    image: {
    type: String,
    },
    comments: [String],
    },
    {
    timestamps: true,
    },
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

### Git

[Repository Link]
[Deploy Link]
[New Future](https://fercfmsouza.github.io/feeding-naruto/)
