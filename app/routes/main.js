'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _package = require('../../package');

var _package2 = _interopRequireDefault(_package);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init router
var app = (0, _express2.default)();

/* GET / */
// Routes for /
/**
 * Module dependencies
 */
app.get('/', function (req, res) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    res.render('index.ejs');
  }
});

/* GET /login */
app.get('/login', function (req, res) {
  res.render('login.ejs', {
    npm: _package2.default
  });
});

/* POST /login */
app.post('/login', function (req, res, next) {
  _passport2.default.authenticate('local', function (err, user, info) {
    if (err) {
      // Untestable
      /* istanbul ignore next */
      return next(err); // will generate a 500 error
    }
    if (!user) {
      return res.render('login.ejs', {
        message: info.message,
        npm: _package2.default
      });
    }
    // Login
    req.login(user, function (loginErr) {
      if (loginErr) {
        // Untestable
        /* istanbul ignore next */
        return next(loginErr);
      }
      res.redirect('/');
    });
  })(req, res, next);
});

/* GET /signout */
app.get('/signout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// Export
module.exports = app;