'use strict';
// Polyfill
require('babel-polyfill');
/**
 * Module depedencies
*/
const chalk = require('chalk');
// Vars
let that = {};

/**
 * Logger class
 * @param options {Object} options
*/
class Logger {
  constructor(options) {
    that.options = options;
  }

  /**
   * Get date
   * @private
   */
  _getdate() {
    const date = new Date();
    return chalk.grey(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
  }

  /**
   * Info method
   * @colour green
   * @param txt {String} txt
   */
   /* istanbul ignore info */
   info(txt) {
     if (!that.options.silent) {
       const colour = "green";
       const str = this.prefix || chalk[colour].bold('INFO');
       console.log(`[ ${Logger.prototype._getdate()} ${str} ] ${txt}`);
     }
   }

   /**
    * Error method
    * @colour red
    * @param txt {String} txt
    */
    /* istanbul ignore info */
    err(txt) {
      if (!that.options.silent) {
        const colour = "red";
        const str = chalk[colour].bold('ERR!');
        console.log(`[ ${Logger.prototype._getdate()} ${str} ] ${txt}`);
      }
    }

    /**
     * Throw method
     * @colour red
     * @param err {Error} error to throw
     */
     /* istanbul ignore err */
     throw(err) {
       this.throw_noexit(err);
       process.exit(1);
     }

     /**
      * Throw without exit method
      * @colour red
      * @param err {Error} error to throw
      */
      /* istanbul ignore err */
      throw_noexit(err) {
        if (!that.options.silent) {
          const colour = "red";
          const str = chalk[colour].bold('ERR!');
          console.log(`[ ${Logger.prototype._getdate()} ${str} ]`);
          console.log(`[ ${Logger.prototype._getdate()} ${str} ] ${err.stack.split('\n')[0]}`);
          console.log(`[ ${Logger.prototype._getdate()} ${str} ]`);
          if (that.options.debug || process.env.NODE_ENV !== 'production') {
            console.log(`[ ${Logger.prototype._getdate()} ${str} ] Full error:`);
            console.log(`[ ${Logger.prototype._getdate()} ${str} ]`);
            let e = 0;
            for (e of err.stack.split('\n')) {
              console.log(`[ ${Logger.prototype._getdate()} ${str} ] ${e}`);
            }
          }
          console.log(`[ ${Logger.prototype._getdate()} ${str} ]`);
        }
      }

   /**
    * Debug method
    * @colour cyan
    * @param txt {String} txt
    */
    /* istanbul ignore debug */
    debug(txt) {
      if (!that.options.silent && process.argv.includes('--debug')) {
        const colour = "cyan";
        const str = this.prefix || chalk[colour].bold('DEBUG');
        console.log(`[ ${Logger.prototype._getdate()} ${str} ] ${txt}`);
      }
    }
}

// Export
module.exports = Logger;