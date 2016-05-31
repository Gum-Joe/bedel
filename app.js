'use strict';
// Main app file
/**
 * Module depedencies
*/
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const Logger  = require('./lib/logger');
const morgan = require('morgan');
const parser = require('./lib/parser');
const path = require('path');
const webpack = require('webpack');
const favicon = require('serve-favicon');
// Webpack development
const webpackConfig = require('./webpack.dev.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

/**
 * Server function
 * @param options {Object} Options
*/
module.exports = (options) => {
  /**
   * Vars
  */
  const config = parser.loadConfig();
  const PORT = options.port || process.env.PORT || config.port || 8080;
  const logger = new Logger(options);
  // Webpack compiler
  const compiler = webpack(webpackConfig);

  // Init app
  const app = express();

  // Configure express
  // View engine
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  // Register middlewares
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(favicon(__dirname + '/img/favicon.ico'));
  if (!options.silent) {
    app.use(morgan('dev'));
  }
  if (process.env.NODE_ENV !== 'production') {
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
    // serve static files
    app.use(express.static(path.join(__dirname, 'build')));
  }

  // Connect to DB
  // TODO
  // Routes
  app.get('/', (req, res, next) => res.render('index.ejs'));
  // Create server and listen
  const server = http.createServer(app);
  server.listen(PORT, () => {
    logger.info(`Listenning on port ${PORT}...`);
  });

};
