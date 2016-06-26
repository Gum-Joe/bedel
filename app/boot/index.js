// Boot loader for bedel
/**
 * Module deps
 */
const Logger = require('../util/logger');
const prompt = require('./prompt');

// Loaders
const loaders = [
  prompt
];

/**
 * Booter
 * @param args {Object} arguments
 * @private
 */
const _boot = (resolve, reject) => {
  // Logger
  const logger = new Logger(this.options);
  // Run each loader
  for (let loader of loaders) {
    loader(this.options, reject, logger);
  }
  resolve();
};
// Export method
module.exports = (options) => {
  this.options = options;
  return new Promise(
    _boot.bind(this),
    (err) => { throw err; }
  );
};
