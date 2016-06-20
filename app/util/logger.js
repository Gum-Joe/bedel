'use strict';
// Polyfill

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('babel-polyfill');
/**
 * Module depedencies
*/

// Vars
var that = {};

/**
 * Logger class
 * @param options {Object} options
*/

var Logger = function () {
  function Logger(options) {
    _classCallCheck(this, Logger);

    that.options = Object.assign({
      silent: false,
      debug: false
    }, options);
  }

  /**
   * Get date
   * @private
   */


  Logger.prototype._getdate = function _getdate() {
    var date = new Date();
    return _chalk2.default.grey(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
  };

  /**
   * Info method
   * @colour green
   * @param txt {String} txt
   */
  /* istanbul ignore info */


  Logger.prototype.info = function info(txt) {
    if (!that.options.silent) {
      var colour = "green";
      var str = this.prefix || _chalk2.default[colour].bold('INFO');
      console.log('[ ' + Logger.prototype._getdate() + ' ' + str + ' ] ' + txt);
    }
  };

  /**
   * Error method
   * @colour red
   * @param txt {String} txt
   */
  /* istanbul ignore info */


  Logger.prototype.err = function err(txt) {
    if (!that.options.silent) {
      var colour = "bgRed";
      var str = _chalk2.default[colour].bold('ERR!');
      console.error('[ ' + Logger.prototype._getdate() + ' ' + str + ' ] ' + txt);
    }
  };

  /**
   * Throw method
   * @colour red
   * @param err {Error} error to throw
   */
  /* istanbul ignore err */


  Logger.prototype.throw = function _throw(err) {
    if (process.env.NODE_ENV !== 'test') {
      this.throw_noexit(err);
      process.exit(1);
    } else {
      throw err;
    }
  };

  /**
   * Throw without exit method
   * @colour red
   * @param err {Error} error to throw
   */
  /* istanbul ignore err */


  Logger.prototype.throw_noexit = function throw_noexit(err) {
    if (!that.options.silent) {
      var colour = "bgRed";
      var str = _chalk2.default[colour].bold('ERR!');
      console.error('[ ' + Logger.prototype._getdate() + ' ' + str + ' ]');
      console.error('[ ' + Logger.prototype._getdate() + ' ' + str + ' ] ' + err.stack.split('\n')[0]);
      console.error('[ ' + Logger.prototype._getdate() + ' ' + str + ' ]');
      if (that.options.debug || process.env.NODE_ENV !== 'production') {
        console.error('[ ' + Logger.prototype._getdate() + ' ' + str + ' ] Full error:');
        console.error('[ ' + Logger.prototype._getdate() + ' ' + str + ' ]');
        var e = 0;
        for (var _iterator = err.stack.split('\n'), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          if (_isArray) {
            if (_i >= _iterator.length) break;
            e = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            e = _i.value;
          }

          console.error('[ ' + Logger.prototype._getdate() + ' ' + str + ' ] ' + e);
        }
      }
      console.error('[ ' + Logger.prototype._getdate() + ' ' + str + ' ]');
    }
  };

  /**
   * Debug method
   * @colour cyan
   * @param txt {String} txt
   */
  /* istanbul ignore debug */


  Logger.prototype.debug = function debug(txt) {
    if (!that.options.silent && that.options.debug) {
      var colour = "cyan";
      var str = this.prefix || _chalk2.default[colour].bold('DEBUG');
      console.log('[ ' + Logger.prototype._getdate() + ' ' + str + ' ] ' + txt);
    }
  };

  // Make a method


  Logger.prototype.make = function make(method, options) {
    return this[method].bind(options);
  };

  return Logger;
}();

// Export


module.exports = Logger;