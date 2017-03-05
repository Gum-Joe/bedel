// Boot loader for bedel
/**
 * Module deps
 */
const Logger = require('../util/logger');
//const prompt = require('./prompt');
const appLoader = require('./app-loader');
const https = require('./https');

// Loaders
const loaders = [
  //https,
  //prompt, For later
  appLoader
];

/**
 * Booter
 * @param args {Object} arguments
 * @private
 */

function __boot(options) {
  const logger = new Logger(options);
  let i = 0;
  while (i < loaders.length) {
    const loader = loaders[i];
    loader(options, logger, (err) => {
      i++;
      if (err) {
        logger.err(`Loader ${loaders[i]} failed`);
        logger.throw(err);
      }
    });
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
  __boot(options);
  cb();
};
