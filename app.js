'use strict';
// Main app file
/**
 * Module depedencies
*/
const bodyParser = require('body-parser');
const chalk = require('chalk');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const db = require('./lib/database');
const express = require('express');
const express_session = require('express-session');
const favicon = require('serve-favicon');
const flash = require('connect-flash');
const http = require('http');
const Logger  = require('./lib/logger');
const minify = require('express-minify');
const minifyHTML = require('express-minify-html');
//const MongoStore = require('connect-mongo')(express_session);
const morgan = require('morgan');
const parser = require('./lib/parser');
const path = require('path');
const routes = require('./routes');
const sass = require('node-sass-middleware');
const usePassportMiddleware = require('./lib/passport');
const webpack = require('webpack');
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
  const PORT = options.port || process.env.PORT || config.port || vars.DEFAULT_PORT;
  const logger = new Logger(options);
  // Webpack compiler
  const compiler = webpack(webpackConfig);
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
  if (process.argv.includes('--debug')) {
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
    logger.debug(`  ${chalk.cyan('\"')}${chalk.cyan(opt)}${chalk.cyan('\"')}`);
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
  app.use(favicon(__dirname + '/client/assets/img/favicon.ico'));
  app.use(cookieParser());
  app.use(express_session({
    resave: false,
    secret: secrets.session_secret,
    saveUninitialized: false
    //store: new MongoStore(options)
  }));
  app.use(sass(sassOptions));
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
        minifyJS:                  true
    }
  }));

  /* istanbul ignore if */
  // Logger for requests
  if (!options.silent) {
    app.use(morgan('dev'));
  }
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
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
    app.use(express.static(path.join(__dirname, 'build/js')));
  }

  // Static files
  app.use(express.static(path.join(__dirname, 'node_modules')));
  app.use(express.static(path.join(__dirname, 'client', 'assets')));
  app.use(express.static(path.join(__dirname, 'views')));

  // Routes
  app.use('/', routes.index);

  // Create server and listen
  logger.debug('Creating server...');
  const server = http.createServer(app);
  server.listen(PORT, () => {
    logger.info(`Listenning on port ${PORT}.`);
  });

  // Connect to db
  db.connect(options);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    const err = new Error('404: Not Found');
    err.status = 404;
    next(err);
  });

  // Error handler
  app.use(function(err, req, res, next) {
    logger.throw_noexit(err);
    // Fix error formatting
    let a;
    let split = err.stack.split('\n');
    for (a = 0; a < split.length; a++) {
      if (split[a].includes('at ')) {
        split[a] = "\t" + split[a];
      }
    }
    err.stack = split.join('\n');
    // Send
    res.status(err.status || 500);
    res.render('error.ejs', {
      message: err.message,
      err: err
    });
  });

};
