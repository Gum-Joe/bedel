// Routes for /
/**
 * Module dependencies
 */
const express = require('express');
const npm = require('../package');
const passport = require('passport');

// Init router
const app = express();

/* GET / */
app.get('/', (req, res) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    res.render('index.ejs');
  }
});

/* GET /login */
app.get('/login', (req, res) => {
  res.render('login.ejs', {
    npm: npm
  });
});

/* POST /login */
/*
app.post('/login', passport.authenticate('local', {
  successRedirect: '/', failureRedirect: '/login', failureFlash: true
}));*/

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); // will generate a 500 error
    }
    if (!user) {
      return res.render('login.ejs', {
        message: info.message,
        npm: npm
      });
    }
    // Login
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

// Export
module.exports = app;
