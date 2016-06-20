'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logger = require('../util/logger');

var _logger2 = _interopRequireDefault(_logger);

var _socket = require('./socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Index of api
require('babel-polyfill');
/**
 * Module depedencies
*/


/**
 * API class
 * @param server {Server} - Http/Https server class
 */

var Api = function Api(server, options) {
  _classCallCheck(this, Api);

  this.server = server;
  this.logger = new _logger2.default(options);
  this.logger.prefix = _chalk2.default.yellow.bold('API');
  // Create a socket.io instance
  this.logger.debug('Starting socket.io server...');
  this.sockets = _socket2.default;
  this.sockets.init(this.server, this.logger);
  this.io = this.sockets.io;
  this.logger.info('Socket.io server started.');
};

// Export


module.exports = {
  API: Api
};