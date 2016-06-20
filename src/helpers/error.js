// Error handler
/**
 * Module depedencies
*/
import chalk from 'chalk';

// Handlers
/**
 * Catch 404 error and forward to error handler
 * @param req {Object} - Express request object
 * @param res {Object} - Express response object
 * @param next {Function} - Express callback
*/
const makeE404 = () => {
  return (req, res, next) => {
    const err = new Error('404: Not Found');
    err.status = 404;
    next(err);
  };
};

/**
 * Error Handler
 * @param err {Error} - Error object
 * @param req {Object} - Express request object
 * @param res {Object} - Express response object
 * @param next {Function} - Express callback
*/
const makeErrHandle = (oldLogger) => {
  const logger = oldLogger;
  return (error, req, res, next) => {
    // Reassign
    let err = error;
    if (!err.status) {
      err.status = 500;
    }
    if (err.status > 499) {
      logger.prefix = chalk.red.bold(`E${err.status}`);
    } else if (err.status < 500 && err.status > 399) {
      logger.prefix = chalk.yellow.bold(`E${err.status}`);
    }
    logger.info(`Got a ${err.status || 500} for ${req.url}`);
    logger.prefix = null;
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
  };
};

/**
 * Use method
 * @param app {Object} Express app object
 * @param logger {Logger} Logger
*/
module.exports = (app, logger) => {
  app.use(makeE404());
  app.use(makeErrHandle(logger));
};
