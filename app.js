'use strict';

// Main app file
/**
 * Module depedencies
*/
const { API } = require('./app/api');
const appLoader = require('./app/apps/loader');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const db = require('./app/database');
const express = require('express');
const express_session = require('express-session');
const favicon = require('serve-favicon');
const flash = require('connect-flash');
const http = require('http');
const Logger  = require('./app/util/logger');
const minify = require('express-minify');
const minifyHTML = require('express-minify-html');
const MongoStore = require('connect-mongo')(express_session);
const mongoose = require('mongoose');
const morgan = require('morgan');
const parser = require('./app/util/parser');
const path = require('path');
const routes = require('./app/routes');
const usePassportMiddleware = require('./app/auth/passport');
const helpers = require('./app/helpers');
const vars = require('./app/util/vars');

/**
 * Server function
 * @param options {Object} Options
 * @param callback {Function} Callback (for tests)
*/
module.exports = (options) => {
  /**
   * Vars
  */
  const config = parser.loadConfig(vars.CONFIG_FILE);
  const PORT = options.port || process.env.PORT || config.port || vars.DEFAULT_PORT;
  const logger = new Logger(options);
  // Secrets
  const secrets = parser.loadConfig(config.secrets);
  // Sass options
  const sassOptions = {
    src: path.join(__dirname, 'client', 'sass'),
    dest: path.join(__dirname, 'views', 'css'),
    debug: false,
    prefix:  '/css'
  };
  /* istanbul ignore if */
  if (options.debug) {
    sassOptions.debug = true;
  }

  // Init app
  const app = express();

  // Debug logging
  logger.debug('Starting server...');
  logger.debug(`Args: ${chalk.magenta('[')}`);
  // Interator vars
  let opt;
  /* istanbul ignore next */
  for (opt of process.argv) {
    logger.debug(`  ${chalk.cyan('"')}${chalk.cyan(opt)}${chalk.cyan('"')}`);
  }
  logger.debug(`${chalk.magenta(']')}`);
  logger.debug('Configuring express...');

  // Configure express
  // View engine
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.set('view engine', 'ejs');
  // Register middlewares
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(favicon(path.join(__dirname, '/client/assets/img/favicon.ico')));
  app.use(cookieParser());
  app.use(express_session({
    resave: true,
    secret: secrets.session_secret,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 10 * 60 * 60
    })
  }));
  app.use(flash());
  usePassportMiddleware(app);
  app.use(compression());
  app.use(minify({
    js_match: /js/,
    cache: vars.CACHE_DIR
  }));
  app.use(minifyHTML({
    override:      true,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  false
    }
  }));

  /* istanbul ignore if */
  // Logger for requests
  if (!options.silent) {
    app.use(morgan('dev'));
  }
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    // Use hot reload
    helpers.useWebpackHot(app, options);
  } else {
    logger.debug('Serving compiled javascript as static files.');
    // serve static files
    app.use(express.static(path.join(__dirname, 'build')));
    app.use(express.static(path.join(__dirname, 'build/js')));
  }

  // Static files
  app.use(express.static(path.join(__dirname, 'node_modules')));
  app.use(express.static(path.join(__dirname, 'client')));
  app.use(express.static(path.join(__dirname, 'client/assets')));
  app.use(express.static(path.join(__dirname, 'views')));

  // Routes
  app.use('/', routes.index);
  app.use('/api', routes.api);

  // Create server and listen
  logger.debug('Creating server...');
  const server = http.createServer(app);
  server.listen(PORT, () => {
    logger.info(`Listenning on port ${PORT}.`);
  });

  // Connect to db
  db.connect(options);

  // Init the api
  const api = new API(server, app, options);
  helpers.addApiPlugins(api);

  // Load apps
  appLoader(api, logger);
  // Add socket.io listenner
  /** Example
  api.sockets.use('event', (socket, logger) => {
    return () => {
      logger.info('t');
    };
  }); */
  // Use our error handler
  helpers.useErrorHandler(app, logger);

  return app;
};
