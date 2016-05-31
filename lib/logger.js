'use strict';
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
       const str = chalk[colour].bold('INFO');
       console.log(`[ ${this._getdate()} ${str} ] ${txt}`);
     }
   }
}

// Export
module.exports = Logger;
