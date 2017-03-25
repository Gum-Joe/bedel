// Boot loader for bedel
/**
 * Module deps
 */
const Logger = require('../util/logger');
//const prompt = require('./prompt');
const appLoader = require('./app-loader');
const https = require('./https');
const api = require('./bedel-api');
const async = require('async');

// Loaders
const loaders = [
  //https,
  //prompt, For later
  api,
  appLoader
];

/**
 * Booter
 * @param args {Object} arguments
 * @private
 */

function __boot(options, cb) {
  const logger = new Logger(options);
  let asyncLoaders = [];
  // Add callback as a loaders
  loaders.push(function () {
    cb();
  });
  let i = 0;
  while (i <= loaders.length) {
    if (i < loaders.length) {
      const loader = loaders[i];
      asyncLoaders.push(function (done) {
        loader(options, logger, done);
      });
    } else {
      async.series(asyncLoaders);
    }
    i++;
  }
}

const _boot = (resolve, reject) => {
  // Logger
  const logger = new Logger(this.options);
  const booter = __boot(this.options);
  let i = 0;
  while (i <= loaders.length) {
    let nextValue = booter.next().value;
    if (nextValue) {
      i++;
    } else if (typeof nextValue === "undefined") {
      i++;
      resolve();
    } else {
      logger.err(`Loader ${loaders[i]} failed`);
      i++;
    }
  }
};
// Export method
module.exports = (options, cb) => {
  __boot(options, cb);
};
