// Authentication tests
const app = require('../app');
const bcrypt = require('bcryptjs');
const request = require('supertest');
const { connect } = require('../app/database');
const { expect } = require('chai');
const { User } = require('../app/models');
const { BCRYPT_SALT_FACTOR } = require('../app/util/vars');
// User to send
const userToSend = {
  name: 'John',
  username: 'mocha',
  password: 'mocha',
  email: 'someone@example.com'
};
// User to add
const userToAdd = {
  name: userToSend.name,
  username: userToSend.username,
  password: bcrypt.hashSync(userToSend.password, BCRYPT_SALT_FACTOR),
  email: userToSend.email
};
// Fake 'this'
let that = {};
// Timeout
const timeout = 6000;

describe('Authentication tests', () => {
  before((done) => {
    const options = { port: 2709, silent: true };
    // Connect to database
    connect(options);
    // Save a user for testing
    const tmpUser = new User(userToAdd);
    tmpUser.save((err) => { if (err){ throw err; } });
    // Start the server
    that.app = app(options);
    done();
  });

  it('should see if we can authenticate successfully by being redirecting to / (code: 302)', function (done) {
    this.timeout(timeout);
    request(that.app)
      .post('/login')
      .send(userToSend)
      .expect((res) => {
        expect((res.header.location)).to.equal('/');
      })
      .expect(302, done);
  });

  it('should see if we get rendered the login screen if we send an invalid username (code: 200)', function (done) {
    this.timeout(timeout);
    request(that.app)
      .post('/login')
      .send({
        username: 'incorrectUsername',
        password: userToSend.password
      })
      .expect(200, done);
  });

  it('should see if we get rendered the login screen if we send an invalid password (code: 200)', function (done) {
    this.timeout(timeout);
    request(that.app)
      .post('/login')
      .send({
        username: userToSend.username,
        password: 'incorrectPassword'
      })
      .expect(200, done);
  });

  it('should see if we get serialized and deserialized into and out of a session', function (done) {
    this.timeout(timeout);
    request(that.app)
      .post('/login')
      .send(userToSend)
      .expect('set-cookie', /connect.sid=(.*)/, done);
  });

  it('should logout when we GET /signout', function (done) {
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
        // Now we send the cookie and logout
        request(that.app)
          .get('/signout')
          .set('Cookie', `connect.sid=${sendCookie}`)
          .expect((res) => {
            expect((res.header.location)).to.equal('/');
          })
          .expect(302)
          .end((err) => {
            if (err) {
              throw err;
            }
            // Test login
            // It should redirect to /
            request(that.app)
              .get('/')
              .set('Cookie', `connect.sid=${sendCookie}`)
              .expect((res) => {
                expect((res.header.location)).to.equal('/login');
              })
              .expect(302, done);
          });
      });
  });
});
