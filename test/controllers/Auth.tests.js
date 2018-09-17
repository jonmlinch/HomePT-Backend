/* // for express, required by Auth controller */
// const express = require('express');
// // for making test requests
// const request = require('supertest');
// // for creating test samples
// const User = require('../../models/User');
// // for chai's expect BDD syntax
// const expect = require('chai').expect;


// describe('Auth Controller Unit Tests', function() {

  // // Auth doesn't have access to index.js, need to load express here
  // const app = express();
  // // for Auth controller to test
  // app.use('/auth', require('../../controllers/Auth'));

  // const invalidEmail = 'this@is.not';

  // // describe('login with unregistered email returns 403', function() {
  // // request(app)
  // // .post('/auth/login')
  // // .send(invalidEmail)
  // // .expect(403)
  // // .end(function(err, res) {
  // // if (err) return done(err);
  // // expect(res.body).equal('That email is not registered');
  // // done();
  // // })
  // // });
  // expect(true).to.be.true;

/* }); */

const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

describe('GET /user', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
