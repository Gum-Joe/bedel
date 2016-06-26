'use strict';
// Polyfill
require('babel-polyfill');
/**
 * Module depedencies
*/
const chalk = require('chalk');

/**
 * Logger class
 * @param options {Object} options
*/
class Logger {
  constructor(options) {
    this.options = Object.assign({
      silent: false,
      debug: false
    }, options || {});
    // Stdout
    this.stdout = console.log;
  }

  /**
   * Get date
   * @private
   */
  static getdate() {
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
     if (!this.options.silent) {
       const colour = "green";
       const str = this.prefix || chalk[colour].bold('INFO');
       this.stdout(`[ ${Logger.getdate()} ${str} ] ${txt}`);
     }
   }

   /**
    * Error method
    * @colour red
    * @param txt {String} txt
    */
    /* istanbul ignore info */
    err(txt) {
      if (!this.options.silent) {
        const colour = "bgRed";
        const str = chalk[colour].bold('ERR!');
        console.error(`[ ${Logger.getdate()} ${str} ] ${txt}`);
      }
    }

    /**
     * Throw method
     * @colour red
     * @param err {Error} error to throw
     */
     /* istanbul ignore err */
     throw(err) {
       if (process.env.NODE_ENV !== 'test') {
         this.throw_noexit(err);
         process.exit(1);
       } else {
         throw err;
       }
     }

     /**
      * Throw without exit method
      * @colour red
      * @param err {Error} error to throw
      */
      /* istanbul ignore err */
      throw_noexit(err) {
        if (!this.options.silent) {
          const colour = "bgRed";
          const str = chalk[colour].bold('ERR!');
          console.error(`[ ${Logger.getdate()} ${str} ]`);
          console.error(`[ ${Logger.getdate()} ${str} ] ${err.stack.split('\n')[0]}`);
          console.error(`[ ${Logger.getdate()} ${str} ]`);
          if (this.options.debug || process.env.NODE_ENV !== 'production') {
            console.error(`[ ${Logger.getdate()} ${str} ] Full error:`);
            console.error(`[ ${Logger.getdate()} ${str} ]`);
            let e = 0;
            for (e of err.stack.split('\n')) {
              console.error(`[ ${Logger.getdate()} ${str} ] ${e}`);
            }
          }
          console.error(`[ ${Logger.getdate()} ${str} ]`);
        }
      }

   /**
    * Debug method
    * @colour cyan
    * @param txt {String} txt
    */
    /* istanbul ignore debug */
    debug(txt) {
      if (!this.options.silent && this.options.debug) {
        const colour = "cyan";
        const str = this.prefix || chalk[colour].bold('DEBUG');
        this.stdout(`[ ${Logger.getdate()} ${str} ] ${txt}`);
      }
    }

    // Make a method
    make(method, options) {
      return this[method].bind(
        Object.assign(this, { options: options })
      );
    }
}

// Export
module.exports = Logger;
