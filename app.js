'use strict';
// Main app file
/**
 * Module depedencies
*/
const bodyParser = require('body-parser');
const chalk = require('chalk');
const db = require('./lib/database');
const express = require('express');
const http = require('http');
const Logger  = require('./lib/logger');
const morgan = require('morgan');
const parser = require('./lib/parser');
const path = require('path');
const routes = require('./routes');
const webpack = require('webpack');
const favicon = require('serve-favicon');
const vars = require('./lib/vars');
// Webpack development
const webpackConfig = require('./webpack.dev.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

/**
 * Server function
 * @param options {Object} Options
 * @param callback {Function} Callback (for tests)
*/
module.exports = (options, callback) => {
  /**
   * Vars
  */
  const config = parser.loadConfig(vars.CONFIG_FILE);
  const PORT = options.port || process.env.PORT || config.port || 8080;
  const logger = new Logger(options);
  // Webpack compiler
  const compiler = webpack(webpackConfig);
  // Secrets
  const secrets = parser.loadConfig(config.secrets);

  // Init app
  const app = express();

  // Debug logging
  logger.debug('Starting server...');
  logger.debug(`Options: ${chalk.magenta('[')}`);
  // Interator vars
  let opt;
  /* istanbul ignore next */
  for (opt of process.argv) {
    logger.debug(`  ${chalk.cyan('\"')}${chalk.cyan(opt)}${chalk.cyan('\"')}`);
  }
  logger.debug(`${chalk.magenta(']')}`);
  logger.debug('Configuring express...');

  // Configure express
  // View engine
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  // Register middlewares
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(favicon(__dirname + '/img/favicon.ico'));
  /* istanbul ignore if */
  // Logger for requests
  if (!options.silent) {
    app.use(morgan('dev'));
  }
  /* istanbul ignore else */
  if (!options.env || options.env !== 'production' || process.env.NODE_ENV !== 'production') {
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
      log: logger.info
    }));
  } else {
    logger.debug('Serving compiled javascript as static files.');
    // serve static files
    app.use(express.static(path.join(__dirname, 'build')));
  }

  // Routes
  app.use('/', routes.index)

  // Connect to DB
  db.connect(options);

  // Create server and listen
  logger.debug('Creating server...');
  const server = http.createServer(app);
  server.listen(PORT, () => {
    logger.info(`Listenning on port ${PORT}.`);
  });

};
