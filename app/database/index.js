'use strict';
// Database connecter
/**
 * Module depedencies
*/

var _connecter = require('./connecter');

var _connecter2 = _interopRequireDefault(_connecter);

var _logger = require('../util/logger');

var _logger2 = _interopRequireDefault(_logger);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _parser = require('../util/parser');

var _parser2 = _interopRequireDefault(_parser);

var _vars = require('../util/vars');

var _vars2 = _interopRequireDefault(_vars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Exported method
 * @param options {Object} Options
*/
var connect = function connect(options) {
  /**
   * Vars
  */
  var config = options.config || _parser2.default.loadConfig(options.configFile || _vars2.default.CONFIG_FILE);
  var logger = new _logger2.default(options);
  var retries = 0;
  // Connect
  (0, _connecter2.default)(logger, config);
  // Handle errors
  // From: http://mongoosejs.com/docs/index.html
  // Modified to use ES6
  var db = _mongoose2.default.connection;
  db.on('error', function (err) {
    if (retries > config.db.max_retries) {
      logger.debug("");
      logger.err("Maximum connection retries exceeded for database!");
      logger.throw(err);
    } else {
      logger.debug("");
      logger.debug('Retrying connection to db (' + retries + ' of ' + config.db.max_retries + ')...');
      retries++;
      (0, _connecter2.default)(logger, config);
    }
  });
  db.once('open', function () {
    logger.info('Connected to the database.');
  });
};

// Export
module.exports = {
  connect: connect
};