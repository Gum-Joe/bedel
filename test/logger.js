'use strict';
// logger.js tests
const chai = require('chai');
const expect = chai.expect;
const chalk = require('chalk');
const Logger = require('../lib/logger');
// Init logger
const logger = new Logger();

// Tests
describe('logger.js tests', () => {

  it('should check if logger._getdate() works', (done) => {
    // Date to help with checking
    const date = new Date();
    // Test
    expect(logger._getdate()).to.equal(chalk.grey(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`));
    done();
  });

  it('should check if logger.info() works', (done) => {
    // Date to help with checking
    const date = new Date();
    // Pipe console.log
    old = console.log;
    console.log = (txt) => {
      const str = chalk.green.bold('INFO');
      expect(txt).to.equal(`[ ${logger._getdate()} ${str} ] test`);
    };
    // Test
    logger.info('test');
    // Reset
    console.log = old;
    done();
  });

});
