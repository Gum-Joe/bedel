// Local stratergy for passport

/**
 * Module depedencies
*/
const bcrypt = require('bcryptjs');
const models = require('../../models');
const Stratergy = require('passport-local');

/**
 * Vars
*/
const User =  models.User;

// Export
module.exports = new Stratergy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        // Untestable
        /* istanbul ignore next */
        return done(err, false);
      }
      if (!user) {
        return done(null, false, { message: 'Unreconised username.'});
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null, user);
    });
  }
);
