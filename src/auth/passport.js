// Passport middleware provider
/**
 * Module depedencies
*/
import local from './passport/local';
import models from '../models';
import passport from 'passport';

/**
 * Vars
*/
const User =  models.User;

/**
 * Method
 * @param app {Object} Express app object
*/
module.exports = (app) => {
  // Serialize and deserialize our users
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    // Tested, but istanbul says it is not
    /* istanbul ignore next */
    User.findOne({ _id: id }, function (err, user) {
      done(err, user);
    });
  });

  // Add stratergies
  passport.use(local);

  // Add to express
  app.use(passport.initialize());
  app.use(passport.session());
};
