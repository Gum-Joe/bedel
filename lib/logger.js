'use strict';
/**
 * Module depedencies
*/
const chalk = require('chalk');
// Logger
class Logger {
  constructor() {

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
   info(txt) {
     const str = chalk.green.bold('INFO');
     console.log(`[ ${this._getdate()} ${str} ] ${txt}`);
   }
}

// Export
module.exports = Logger;
