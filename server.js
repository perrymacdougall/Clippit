"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// const cookieSession = require(‘cookie-session’);
const bcrypt = require('bcrypt');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));


// app.use(cookieSession({
//   name: ‘session’,
//   keys: [“Resource”, “Wall”],
// }));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

const users = {
  userRandomID: {
    id: 'aJ48lW',
    email: 'user@example.com',
    password: 'purple-monkey-dinosaur'
  },
  user2RandomID: {
    id: 'user2RandomID',
    email: 'user2@example.com',
    password: 'dishwasher-funk'
  }
};

// DRY function to look up if email exists ---------------------------------------------------------
const doesUserExist = email => {
  for (let userId in users) {
    let user = users[userId];

    console.log(user.email)

    if (user.email.toLowerCase() === email.toLowerCase()) {
      return true;
    }
  }

  return false;
}
// DRY funciton to look if email is already registered -----------------------------------------
const findUserByEmail = email => {
  for (let userId in users) {
    let user = users[userId];

    console.log(user.email)

    if (user.email.toLowerCase() === email.toLowerCase()) {
      return user;
    }
  }

  return null;
}

// This generates the randoms string for both the tiny app and userID---------------------------
function generateRandomString () {
  return Math.floor((1 + Math.random()) * 0x10000000).toString(36);
}

// Registration page ----------------------------------------------------------------------------
app.get('/register', (req, res) => {
  res.render('register.ejs')
});

app.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email === '' || password === '') {
    res.status(400);
    res.send('Status code error ;p Email or Password can not be empty');
  } else if (doesUserExist(email)) {
    res.status(400);
    res.send('Status code error ;p User already exists');
  } else {
    // create new user with random id
    const id = generateRandomString();
    const newUser = {
      id,
      email,
      password
    };

    // insert new user to the users object
    users[id] = newUser;
    // save the user id in a session

    console.log(users)
    res.redirect('/');
  }
});

// LOG IN -----------------------------------------------------------------------------------

app.get('/login', (_req, res) => {
  res.render('login.ejs');
});

app.post('/login', (req, res) => {
  const email = req.body.email;

  if (!doesUserExist(email)) {
    res.status(403).send('User cannot be found');
  } else {
    const user = findUserByEmail(email)
    const password = req.body.password;
    // const hashedPassword = user.password;

    if (password == user.password) {
    // if (bcrypt.compareSync(password, hashedPassword)) {
      // req.session.user_id = user.id;

      // to redirect to the page which shows his newly created tiny URL
      res.redirect('/') 
    } else {
      res.status(403).send('Password incorrect')
    }
  }
});


















app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
