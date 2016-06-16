// Router tests
const app = require('../app');
const request = require('supertest');
const { connect } = require('../app/database');
const { expect } = require('chai');
// User to send for login tests
const userToSend = {
  name: 'John',
  username: 'mocha',
  password: 'mocha',
  email: 'someone@example.com'
};
// Fake 'this'
let that = {};
// Timeout
const timeout = 6000;
// Port
const port = 6809;

describe('Router tests', () => {

  before(function (done) {
    this.timeout(timeout);
    const options = { port: port, silent: true };
    // Connect to database
    connect(options);
    // Start the server
    that.app = app(options);
    done();
  });

  it('should return the user object when we GET /api/session/user', function (done) {
    this.timeout(timeout);
    // Login
    request(that.app)
      .post('/login')
      .send(userToSend)
      .expect(302)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        const cookie = res.headers['set-cookie'][0];
        const noEqual = cookie.split('=')[1];
        const sendCookie = noEqual.split('; ')[0];
        // Now we send the cookie and test the response
        request(that.app)
          .get('/api/session/user')
          .set('Cookie', `connect.sid=${sendCookie}`)
          .expect((res) => {
            // Run assestions
            const parsed = JSON.parse(res.text);
            expect(parsed.name).to.equal(userToSend.name);
            expect(parsed.username).to.equal(userToSend.username);
            expect(parsed.email).to.equal(userToSend.email);
          })
          .expect(200, done);
      });
  });

  it('should redirect to /login if not logged in (code: 302)', function (done) {
    this.timeout(timeout);
    request(that.app)
      .get('/')
      .expect((res) => {
        expect((res.header.location)).to.equal('/login');
      })
      .expect(302, done);
  });

  it('should render index.ejs when we are logged in (code: 302)', function (done) {
    this.timeout(timeout);
    // Login
    request(that.app)
      .post('/login')
      .send(userToSend)
      .expect(302)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        const cookie = res.headers['set-cookie'][0];
        const noEqual = cookie.split('=')[1];
        const sendCookie = noEqual.split('; ')[0];
        // Now we send the cookie and test the response
        request(that.app)
          .get('/')
          .set('Cookie', `connect.sid=${sendCookie}`)
          .expect(/<title>Dashboard | Bedel<\/title>/)
          .expect(200, done);
      });
  });

  it('should redirect to / when we login', function (done) {
    this.timeout(6000);
    request(that.app)
      .post('/login')
      .send(userToSend)
      .expect((res) => {
        expect((res.header.location)).to.equal('/');
      })
      .expect(302, done);
  });

  it('should redirect to / when we signout', function (done) {
    this.timeout(6000);
    request(that.app)
      .get('/signout')
      .expect((res) => {
        expect((res.header.location)).to.equal('/');
      })
      .expect(302, done);
  });

});
