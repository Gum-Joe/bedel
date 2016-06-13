// Index of api
/**
 * Module depedencies
*/
const chalk = require('chalk');
const Logger = require('../util/logger');
const io = require('./socket.io');

/**
 * API class
 * @param server {Server} - Http/Https server class
 */
class Api {
  constructor(server, options) {
    this.server = server;
    this.logger = new Logger(options);
    this.logger.prefix = chalk.yellow.bold('SOCK');
    // Create a socket.io instance
    this.logger.debug('Starting socket.io server...');
    this.sockets = io;
    this.sockets.init(this.server);
    this.io = this.sockets.io;
    this.logger.info('Socket.io server started.');
    this.logger.prefix = null;
  }
}

// Export
module.exports = {
  API: Api
};
