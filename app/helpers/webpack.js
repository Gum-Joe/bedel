// Webpack hot reload handler
/**
 * Module depedencies
*/
const chalk = require('chalk');
const Logger  = require('../util/logger');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.dev.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
// Webpack compiler
const compiler = webpack(webpackConfig);

/**
 * Use method
 * @param app {Object} - Express app object
 * @param options {Object} - Options
*/
module.exports = (app, options) => {
  const logger = new Logger(options);
  logger.prefix = chalk.bgBlue.white('WPACK');
  logger.debug('Using: webpack hot reload');
  // Webpack server -  helped by (http://madole.github.io/blog/2015/08/26/setting-up-webpack-dev-middleware-in-your-express-application/)
  app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      noInfo: true,
      stats: {
        colors: true
      }
  }));
  app.use(webpackHotMiddleware(compiler, {
    // Use our logger
    log: logger.make('info', { prefix: logger.prefix, silent: logger.options.silent })
  }));
};
