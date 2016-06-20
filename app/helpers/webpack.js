'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logger = require('../util/logger');

var _logger2 = _interopRequireDefault(_logger);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDev = require('../../webpack.dev.js');

var _webpackDev2 = _interopRequireDefault(_webpackDev);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Webpack compiler
// Webpack hot reload handler
/**
 * Module depedencies
*/
var compiler = (0, _webpack2.default)(_webpackDev2.default);

/**
 * Use method
 * @param app {Object} - Express app object
 * @param options {Object} - Options
*/
module.exports = function (app, options) {
  var logger = new _logger2.default(options);
  logger.prefix = _chalk2.default.bgBlue.white('WPACK');
  logger.debug('Using: webpack hot reload');
  // Webpack server -  helped by (http://madole.github.io/blog/2015/08/26/setting-up-webpack-dev-middleware-in-your-express-application/)
  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    publicPath: _webpackDev2.default.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  }));

  app.use((0, _webpackHotMiddleware2.default)(compiler, {
    // Use our logger
    log: logger.make('info', { prefix: logger.prefix, silent: options.silent })
  }));
};