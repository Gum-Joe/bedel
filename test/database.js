// Database tests
// TODO
process.env.NODE_ENV = 'test';
//const { connect } = require('../app/database');
//const { expect } = require('chai');

describe('Database tests', () => {
  it('should throw an error if connecting to the database fails'/*, (done) => {
    expect(() => {
      connect({
        config: {
          db: {
            url: '127.0.0.1',
            port: 25565,
            max_retries: 2
          }
        },
        silent: true
      });
    }).to.throw(Error, "connect ECONNREFUSED 127.0.0.1:25565");
    done();
  }*/);
});
