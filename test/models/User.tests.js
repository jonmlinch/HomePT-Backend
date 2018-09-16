// for User model
const User = require('../../models/User');
// for chai
const expect = require('chai').expect;

// unit test suite for wish model
describe('User Model Unit Tests', function() {

  //
  // shared test objects
  //

  // prepare database for User model test suite

  // setup basic not-yet-saved testing data

  // User.email tests
  describe('email is a valid format', function() {
    it('should reject a missing @', function() {
      let toReject = new User();
      toReject.name = 'valid name';
      toReject.email = 'noAtSign';
      toReject.validate(function(err) {
        expect(err.errors.email).to.exist;
      });
    });
    it('should confirm a valid email format', function() {
      let toConfirm = new User();
      toConfirm.name = 'valid name';
      toConfirm.email = 'this1@is.valid';
      toConfirm.validate(function(err) {
        console.log(err.errors.email);
        expect(err.errors.email).to.not.exist;
      });
    });
  });
});
