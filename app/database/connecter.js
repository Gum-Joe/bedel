'use strict';
// Connects to the database
/**
 * Module depedencies
*/

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Initial connection
 * @param loggerOld {Logger} Logger
 * @private
 */
var connect = function connect(loggerOld, config) {
  var logger = loggerOld;
  logger.prefix = _chalk2.default.magenta.bold('DBASE');
  logger.debug('Connecting to the database...');
  if (_mongoose2.default.connection.readyState <= 0) {
    var dbc = config.db;
    var url = process.env.MONGODB_URL || 'mongodb://' + dbc.url + ':' + dbc.port + '/' + config.name;
    logger.debug('Url: ' + _chalk2.default.green.bold(url));
    _mongoose2.default.connect(url);
  } else {
    logger.info('Already connected to database.');
  }
};

// Export
module.exports = connect;