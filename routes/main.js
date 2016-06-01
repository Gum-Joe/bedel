// Routes for /
/**
 * Module dependencies
 */
const express = require('express');
const npm = require('../package');

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
app.get('/login', function(req, res) {
  res.render('login.ejs', {
    npm: npm
  });
});

// Export
module.exports = app;
