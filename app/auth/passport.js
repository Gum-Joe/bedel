'use strict';

var _local = require('./passport/local');

var _local2 = _interopRequireDefault(_local);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Vars
*/
var User = _models2.default.User;

/**
 * Method
 * @param app {Object} Express app object
*/
// Passport middleware provider
/**
 * Module depedencies
*/
module.exports = function (app) {
  // Serialize and deserialize our users
  _passport2.default.serializeUser(function (user, done) {
    done(null, user.id);
  });
  _passport2.default.deserializeUser(function (id, done) {
    // Tested, but istanbul says it is not
    /* istanbul ignore next */
    User.findOne({ _id: id }, function (err, user) {
      done(err, user);
    });
  });

  // Add stratergies
  _passport2.default.use(_local2.default);

  // Add to express
  app.use(_passport2.default.initialize());
  app.use(_passport2.default.session());
};