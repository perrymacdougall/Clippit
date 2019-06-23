"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

const dbQueries = require('./public/scripts/resources.js');
const dbSingleQuery = require('./public/scripts/singleResource.js');

const dbLikeFunction = require('./public/scripts/likeFunction.js');
const dbSearch = require('./public/scripts/search.js');
const dbUpdateUser = require('./public/scripts/updateUser.js');
const dbLookupUserByID = require('./public/scripts/lookupUserByID.js');
const dbAddTag = require('./public/scripts/addTag.js');
const dbAddComment = require('./public/scripts/addComment.js');
const dbAddRating = require('./public/scripts/addRating.js');
const dbCountLikes = require('./public/scripts/countLikes.js');


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
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  force: true,
  outputStyle: 'expanded'
}));

// Routes for scripts
app.use(express.static("public"));
app.use("/scripts", express.static(__dirname + "public"));
app.use("/vendor", express.static(__dirname + "public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.redirect('resources');
});

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
function generateRandomString() {
  return Math.floor((1 + Math.random()) * 0x10000000).toString(36);
}

// Registration page ----------------------------------------------------------------------------
// app.get('/register', (req, res) => {
//   res.render('register.ejs')
// });

// app.post('/register', (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   if (email === '' || password === '') {
//     res.status(400);
//     res.send('Status code error ;p Email or Password can not be empty');
//   } else if (doesUserExist(email)) {
//     res.status(400);
//     res.send('Status code error ;p User already exists');
//   } else {
//     // create new user with random id
//     const id = generateRandomString();


//     const newUser = {
//       id,
//       email,
//       password
//     };

//     // insert new user to the users object
//     users[id] = newUser;
//     // save the user id in a session


//     req.session.user_id = id;

//     console.log("id is: ", id)
//     res.redirect('/resources');
//   }
// });


app.get('/register', (req, res) => {
  res.render('register.ejs')
});

app.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  if (email === '' || password === '') {
    res.status(400);
    res.send('Status code error ;p Email or Password can not be empty');

  } else {

    knex.select('id', 'email', 'password').from('users')
      .where('email', '=', email)
      .asCallback(function (err, rows) {
        if (err) {
          return console.error(err);
        } else {

          if (rows.length > 0) {
            res.status(403).send('User already exists, please login')
          } else if (rows.length == 0) {

            knex('users')
              .returning("id", "name")
              .insert({
                name: name,
                email: email,
                password: password
              })
              .then((users) => {

                req.session.user_id = users[0];
                req.session.user_name = name;
                res.redirect('/resources');
              })
          }
        }
      })
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

  knex.select('id', 'email', 'password', 'name').from('users')
    .where('email', '=', email)
    .asCallback(function (err, rows) {
      if (err) {
        return console.error(err);
      } else {
        if (rows.length == 0) {
          res.status(403).send('User cannot be found');
        } else {
          //
          if (typedPassword == rows[0].password) {
            // if (bcrypt.compareSync(password, hashedPassword)) {
            req.session.user_id = rows[0].id;
            req.session.user_name = rows[0].name;

            res.redirect('/resources', )
          } else {
            res.status(403).send('Password incorrect')
          }
        }
      }
    })
});

// GET resources----------------------------------------------------------------------
app.get('/resources', (req, res) => {
  let user_id = req.session.user_id;
  let user_name = req.session.user_name;
  let user = user_id;
  let name = user_name;
  let searchQuery = req.query.search;

  if(searchQuery) {
    dbSearch.searchResources(searchQuery, function(err, rows) {
      let templateVars = {
        user,
        name,
        rows
      };
      console.log("rows", rows);
      res.render('resources.ejs', templateVars);
      console.log("rows.length:", rows.length)
    })
  } else {
    dbQueries.resources(function(err, result) {

  
      //if they are logged in they can continue:
      let templateVars = {
        user,
        name,
        rows: result.rows
      };
      res.render('resources.ejs', templateVars);
    });
  }
});

// GET ***MY*** resources----------------------------------------------------------------------
app.get('/resources/me', (req, res) => {
  let user = req.session.user_id;
  let name = req.session.user_name;

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

          knex.select('l.like_id', 'r.resource_id', 'r.title', 'r.description', 'r.url')
            .from('likes AS l')
            .innerJoin('resources AS r', 'l.resource_id', '=', 'r.resource_id')
            .where('l.user_id', '=', user)
            .asCallback(function(err, likerows){
              if(err) {
                console.log(err);
              } else {
                console.log(likerows);

                let templateVars = { user, name, rows, likerows };
                res.render('resources_me', templateVars);

              }
            })

        }
      });
  }
});


// Add new resource----------------------------------------------------------------------

app.get('/resources/new', (req, res) => {
  let user = req.session.user_id;
  let name = req.session.user_name;
  if (!user) {
    res.redirect('/login');
  } else {
    let templateVars = { user, name };
    res.render('resources_new', templateVars);
  }
});

app.post('/resources/new', (req, res) => {
  let user = req.session.user_id;
  const title = req.body.title;
  const URL = req.body.URL;
  const description = req.body.description;
  const tag = req.body.tag;
  if (!user) {
    res.redirect('/login');
  } else {
    knex('resources')
    .returning('resource_id')
    .insert({
      title: title,
      url: URL,
      description: description,
      user_id: user
    })
    .then((resource_id) => {
      let tagInfo = {resource_id: resource_id[0], tag: tag};
      dbAddTag.addTag(tagInfo, function(err, info) {
        res.redirect('/resources/me');
      })
    })
  }
})


// GET single resource----------------------------------------------------------------------
app.get('/resources/:id', (req, res) => {
  let user_id = req.session.user_id;
  let user_name = req.session.user_name;
  let idFromURL = req.params.id;

  let user = user_id;
  let name = user_name;

  let numLikes;
  dbCountLikes.countLikes(idFromURL, function(err, likerows) {
    numLikes = likerows[0].count;
  });

  dbSingleQuery.singleResource(idFromURL, function(err, rows) {

    let templateVars = {
      user,
      name,
      rows,
      numLikes
    };
    res.render('resource_single.ejs', templateVars);
  })
});

// This is for LOG OUT ---------------------------------------------------------------
app.post('/logout', (req, res) => {
  req.session = null;
  // user = null;
  res.redirect('/login');
});





app.get('/users/me', (req, res) => {
  let user = req.session.user_id;
  let name = req.session.user_name;
  if (!user) {
    res.redirect('/login');
  } else {
    dbLookupUserByID.lookupUserByID(user, function(err, rows) {
      let templateVars = {
        user,
        name,
        email: rows[0].email
      };
      res.render('users_me', templateVars);
    })
  }
});

app.post('/users/me', (req, res) => {
  let user = req.session.user_id;
  const userInfo =
    {
      user_id: user,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

  if (!user) {
    res.redirect('/login');
  } else {
    //maybe add better password checking later
    dbUpdateUser.updateUser(userInfo, function(err, info) {
      req.session.user_name = userInfo.name;
      res.redirect('/resources/me');
    })
  }
})

app.post('/likes', (req, res) => {
  let user_id = req.session.user_id;

  // if (!user) {
  //   res.redirect('/login');
  // } else {
    // This inserts into db
    let likeInfo = { resource_id: req.body.resource_id, user_id: user_id };
    dbLikeFunction.likeFunction(likeInfo, function(err, rows) {
      res.redirect('/resources/' + req.body.resource_id);
    });

  // }
});

app.post('/tags', (req, res) => {

  let tagContent = req.body.tag;
  let tagResourceId = req.body.resource_id;

  let tagInfo = { tag: tagContent, resource_id: tagResourceId };

  dbAddTag.addTag(tagInfo, function(err, info) {
    res.redirect('/resources/' + tagResourceId);
  })

});

app.post('/comments', (req, res) => {
  let user_id = req.session.user_id;
  let commentContent = req.body.comment;
  let commentResourceId = req.body.resource_id;

  let commentInfo = { comment: commentContent, user_id: user_id, resource_id: commentResourceId };

  dbAddComment.addComment(commentInfo, function(err, info) {
    res.redirect('/resources/' + commentResourceId);
  })

});

app.post('/ratings', (req, res) => {
  let user_id = req.session.user_id;
  let rating = req.body.rating;
  let ratingResourceId = req.body.resource_id;

  let ratingInfo = { rating: rating, user_id: user_id, resource_id: ratingResourceId };

  dbAddRating.addRating(ratingInfo, function(err, info) {
    res.redirect('/resources/' + ratingResourceId);
  })

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
