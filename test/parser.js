'use strict';
// parser.js tests
const { expect } = require('chai');
const parser = require('../app/util/parser');

// Tests
describe('parser.js tests', () => {

  it('should check if parser can parse a given file', (done) => {
    // Parse
    const data = parser.loadConfig('config/config.yml');
    // Check
    expect((data)).to.be.a('object');
    done();
  });

});
