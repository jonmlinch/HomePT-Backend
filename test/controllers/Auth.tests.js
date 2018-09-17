describe('Auth Controller Unit Tests', function() {

  // for making test requests
  const request = require('supertest');
  // for chai's expect BDD syntax
  const expect = require('chai').expect;

  // load server
  const server = request.agent('http://localhost:3000');

  // // for creating test samples
  // const User = require('../../models/User');

  const invalidEmail = 'this@is.not';

  describe('login with unregistered email', function() {
    it('should respond with 400', function(done) {
      server
        .post('/auth/login')
        .send({ email: invalidEmail })
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).equal('That email is not registered');
          done();
        })
    });
  });

});
