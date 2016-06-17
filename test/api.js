// Api tests
const http = require('http');
const { API } = require('../app/api');
const { expect } = require('chai');
// Server
const server = http.createServer();
// Our api
const api = new API(server, {
  silent: true
});

describe('API tests', () => {

  before((done) => {
    server.listen(Math.round(Math.random() * 100), done);
  });

  describe('Socket.io tests', () => {

    before((done) => {
      api.sockets.start();
      done();
    });

    it('should check if api.sockets.use() adds an event to api.sockets.events', (done) => {
      api.sockets.use('event', () => {
        return () => {
          // it works
        };
      });
      expect(api.sockets.events.length).to.equal(1);
      done();
    });

    it('should check if api.sockets.use() supplies the params socket and logger to the event listener', (done) => {
      api.sockets.use('anotherEvent', (socket, logger) => {
        expect(socket).to.be.a('object');
        expect(logger).to.be.a('object');
        return () => {
          // It works!
        };
      });
      done();
    });

  });

});
