// Helper tests
const helpers = require('../app/helpers');
const { expect } = require('chai');

// Fake app object
const app = {
  middleware: [],
  use(middleware) {
    this.middleware.push(middleware);
  }
};

describe('Helper tests (app/helpers)', () => {
  before('initalize helpers', (done) => {
    helpers.useErrorHandler(app);
    done();
  });

  describe('Error handlers', () => {
    it('should check that the 404 error handler returns an error with status 404 and message 404: Not Found', (done) => {
      app.middleware[0]({}, {}, (err) => {
        expect(err.status).to.equal(404);
        expect(err.message).to.equal('404: Not Found');
        done();
      });
    });
  });
});
