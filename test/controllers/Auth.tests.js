describe('Auth Controller Unit Tests', function() {

  // for making test requests
  const request = require('supertest');
  // for chai's expect BDD syntax
  const expect = require('chai').expect;
  // for creating test samples
  const db = require('../../models');

  // load server
  const server = request.agent('http://localhost:3000');

  // setup
  beforeEach(async function() {
    // valid user
    await db.User.create({
      email: 'this@isOkay.org',
      name: 'a valid name',
      password: 'atleast6char',
      type: 'client'
    })
      .catch(function(err) {
        console.log('err in setup creating validUser:', err);
      });
  });

  // teardown
  afterEach(async function() {
    // valid user
    await db.User.deleteOne({ email: 'this@isOkay.org' })
      .catch(function(err) {
        console.log('err in teardown deleting validUser:', err);
      });
  });

  //
  // endpoint tests
  //

  describe('login with unregistered email', function() {
    it('should respond with 400', function(done) {
      server
        .post('/auth/login')
        .send({ email: 'this@isInvalid.org' })
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.err).equal('That email is not registered');
          done();
        })
    });
  });

  describe('login with valid email but wrong password', function() {
    it('should respond with 401', function(done) {
      server
        .post('/auth/login')
        .send({ email: 'this@isOkay.org', password: 'fail' })
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.err).equal('Invalid credentials');
          done();
        })
    });
  });

});
