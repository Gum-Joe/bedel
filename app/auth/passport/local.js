'use strict';

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Vars
*/
var User = _models2.default.User;

// Export
// Local stratergy for passport

/**
 * Module depedencies
*/
module.exports = new _passportLocal2.default(function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      // Untestable
      /* istanbul ignore next */
      return done(err, false);
    }
    if (!user) {
      return done(null, false, { message: 'Unreconised username.' });
    }
    if (!_bcryptjs2.default.compareSync(password, user.password)) {
      return done(null, false, { message: 'Invalid password' });
    }
    return done(null, user);
  });
});