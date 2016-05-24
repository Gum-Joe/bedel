'use strict';
/**
 * Module depedencies
*/
const chalk = require('chalk');

/**
 * Get date
 * @private
 */
const _getdate = () => {
  const date = new Date();
  return chalk.grey(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
};

// Logger
class Logger {
  constructor() {

  }

  /**
   * Info method
   * @colour green
   * @param txt {String} txt
   */
   info(txt) {
     const str = chalk.green.bold('INFO');
     console.log(`[ ${_getdate()} ${str} ] ${txt}`);
   }
}

// Export
module.exports = Logger;
