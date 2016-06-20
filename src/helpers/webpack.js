// Webpack hot reload handler
/**
 * Module depedencies
*/
import chalk from 'chalk';
import Logger  from '../util/logger';
import webpack from 'webpack';
import webpackConfig from '../../webpack.dev.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
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
    log: logger.make('info', { prefix: logger.prefix, silent: options.silent })
  }));
};
