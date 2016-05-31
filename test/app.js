// App.js tests
const chai = require('chai');
const fs = require('fs');
const request = require('request');
const app = require('../app');
const expect = chai.expect;

// Console.log patch
let old = console.log;

// Tests
describe('app.js tests', () => {

  it('should check if server is started successfully', (done) => {
    // Open
    app({ port: 3030, silent: true });
    // Check
    request('http://localhost:3030', (err, response, body) => {
      if (err) {
        throw err;
      }
    });
    done();
  });

  it('should check that express serves static files when not in development mode', (done) => {
    // Open
    const port = 4040;
    app({ port: port, silent: true, env: 'production' });
    // Check
    request.get(`http://localhost:${port}`, (err, response, body) => {
      if (err) {
        throw err;
      }
      fs.readFile('build/js/bundle.js', (err, data) => {
        if (err) {
          throw err;
        }
        expect(body).to.equal(data.toString('utf8'));
      });
      done();
    });
  });
});
