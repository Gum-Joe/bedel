// Index of api
require('babel-polyfill');
/**
 * Module depedencies
*/
const chalk = require('chalk');
const Logger = require('../util/logger');
const io = require('./socket.io');

/**
 * API class
 * @param server {Server} - Http/Https server class
 * @param app {Object} Express app object
 * @param options {Object} Options
 */
class Api {
  constructor(server, app, options) {
    this.server = server;
    this.app = app;
    this.logger = new Logger(options);
    this.logger.prefix = chalk.yellow.bold('API');
    // Create a socket.io instance
    this.logger.debug('Starting socket.io server...');
    this.sockets = io;
    this.sockets.init(this.server, this.logger);
    this.io = this.sockets.io;
    this.logger.info('Socket.io server started.');
  }
  /**
   * Add a plugin to the api for other plugins
   * @param functions {Object} Funtions to add
   */
  addPlugin(functions) {
    for (let func in functions) {
      // Guard against unwanted properties
      if ({}.hasOwnProperty.call(functions, func)) {
        this[func] = functions[func].bind(this);
        this.logger.debug(`Added plugin function ${chalk.cyan(`'${func}'`)} to api.`);
      }
    }
  }
  /**
   * Run a plugin
   * @param plugin {Function} Plugin
   */
  run(plugin) {
    plugin(this);
  }
}

// Export
module.exports = {
  API: Api
};
