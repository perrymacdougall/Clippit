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

const cookieSession = require('cookie-session');
app.use(
  cookieSession({
    name: 'session',
    keys: ['lighthouse-labs'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);


const bcrypt = require('bcrypt');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

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
    email: 'user@123.com',
    password: '123'
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
    // req.session.user_id = users.id;

    req.session.user_id = id;

    console.log("id is: ", id)
    res.redirect('/resources');
  }
});

// LOG IN -----------------------------------------------------------------------------------

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', (req, res) => {
  // Input from user
  const email = req.body.email;
  const typedPassword = req.body.password;
  console.log(email);

  knex.select('id', 'email', 'password').from('users')
      .where('email', '=', email)
      .asCallback(function(err, rows) {
        if (err) {
          // return console.error(err);
        } else {
          if (rows.length == 0) {
            res.status(403).send('User cannot be found');
          } else {
            //
            if (typedPassword == rows[0].password) {
            // if (bcrypt.compareSync(password, hashedPassword)) {
              req.session.user_id = rows[0].id;

              // to redirect to the page which shows his newly created tiny URL
              res.redirect('/resources')
            } else {
              res.status(403).send('Password incorrect')
            }

          }

        }
      // }
    })
});

// GET resources----------------------------------------------------------------------
app.get('/resources', (req, res) => {
  let user_id = req.session.user_id;

  // let user = users[user_id];

  let user = user_id;

  if (!user) {
    // if they are not logged in, they can not continue
    res.redirect('/login');
  }
//if they are logged in:
  let templateVars = { user };
  res.render('resources.ejs', templateVars);
});

// GET ***MY*** resources----------------------------------------------------------------------
app.get('/resources/me', (req, res) => {
  let user = req.session.user_id;

  if (!user) {
    res.redirect('/login');
  } else {
    console.log("user is", user);

    knex.select('title', 'description', 'url', 'resource_id')
      .from('resources')
      .where('user_id', '=', user)
      .asCallback(function(err, rows) {
        if(err) {
          console.log(err);
        } else {
          console.log(rows);
          let templateVars = { user };
          res.render('resources_me', templateVars);
        }
      });
  }
});

// This is for LOG OUT ---------------------------------------------------------------
app.post('/logout', (req, res) => {
  req.session = null;
  // user = null;
  res.redirect('/login');
});














app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
