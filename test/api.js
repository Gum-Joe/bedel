// Api tests
const http = require('http');
const io = require('../app/api/socket.io.js');
const client = require('socket.io-client');
const { API } = require('../app/api');
const { expect } = require('chai');

// Server
const server = http.createServer();

// Our api
const api = new API(server, {
  silent: true
});

// Port
const PORT = 5675;

// Tests
describe('API tests', () => {

  before((done) => {
    server.listen(PORT, done);
    io.init(server, api.logger);
  });

  it('should check that api.addPlugin() adds a plugin', (done) => {
    api.addPlugin({
      testPlugin() {
        return;
      }
    });
    expect(api.testPlugin).to.be.a('function');
    done();
  });

  describe('Socket.io tests', () => {

    before((done) => {
      //api.sockets.start();
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

    it('should check if a listener with no event is executed when the defaultListener is intialized', function (done) {
      this.timeout(6000);
      io.use(() => done());
      io.defaultListener({
        on: (event, cb) => cb()
      });
    });

    it('should check a listener with an event is executed on event', function (done) {
      this.timeout(6000);
      io.events = [];
      io.use('someEvent', () => done());
      io.start();
      client.connect(`http://localhost:${PORT}`);
    });

  });

});
