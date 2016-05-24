'use strict';
// Main app file
// Polyfill
require('babel-polyfill');
/**
 * Module depedencies
*/
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const Logger  = require('./lib/logger');
const morgan = require('morgan');
const parser = require('./lib/parser');
const webpack = require('webpack');
// Webpack development
const webpackConfig = require('./webpack.dev.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
/**
 * Vars
*/
const config = parser.loadConfig();
const PORT = process.env.PORT || config.port || 8080;
const logger = new Logger();
// Webpack compiler
const compiler = webpack(webpackConfig);
// Init app
const app = express();
// Register middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
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
      log: logger.info
  }));
} else {
  // serve static files
  app.use(express.static(path.join(__dirname, 'build')));
}

// Routes

// Create server and listen
const server = http.createServer(app);
server.listen(PORT, () => {
  logger.info(`Listenning on port ${PORT}...`);
});
