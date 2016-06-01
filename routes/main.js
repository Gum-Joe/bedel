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
app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}));

// Export
module.exports = app;
