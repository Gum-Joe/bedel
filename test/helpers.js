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

const loggerObj = {
  info: () => { return; }
};

describe('Helper tests (app/helpers)', () => {
  before('initalize helpers', (done) => {
    helpers.useErrorHandler(app, loggerObj);
    done();
  });

  describe('Error handlers', () => {
    it('should check that the 404 error handler renders error.ejs with status 404 and error message 404: Not Found', (done) => {
      app.middleware[0]({
        url: '/test'
      }, {
        render(page, opts) {
          expect(page).to.equal('error.ejs');
          expect(opts.message).to.equal("404: Not Found");
          expect(this.status).to.equal(404);
          done();
        },
        status(code) {
          this.status = code;
        }
      });
    });

    it('should check that error handler renders error.ejs with message and the error and the status code 500', (done) => {
      const err = new Error("Test");
      err.status = 500;
      app.middleware[1](err, {}, {
        render(page, opts) {
          expect(page).to.equal('error.ejs');
          expect(opts.err).to.equal(err);
          expect(opts.message).to.equal(err.message);
          expect(this.status).to.equal(err.status);
          done();
        },
        status(code) {
          this.status = code;
        }
      });
    });

    it('should assign error status 500 if there is no status code', (done) => {
      const err = new Error("Test");
      app.middleware[1](err, {}, {
        render(page, opts) {
          expect(opts.err.status).to.equal(err.status);
          done();
        },
        status(code) {
          this.status = code;
        }
      });
    });
  });
});
