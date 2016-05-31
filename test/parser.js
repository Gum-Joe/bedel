'use strict';
// parser.js tests
const chai = require('chai');
const fs = require('fs');
const request = require('request');
const parser = require('../lib/parser');
const expect = chai.expect;

// Console.log patch
let old = console.log;

// Tests
describe('parser.js tests', () => {

  it('should check if parser con parse a given file', (done) => {
    // Parse
    const data = parser.loadConfig('config/config.yml');
    // Check
    expect(data).to.be.a('object');
    done();
  });

});
