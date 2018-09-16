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

  // User.name tests
  describe('name is required', function() {
    it('should reject an empty name', function() {
      let toReject = new User();
      toReject.name = '       ';
      toReject.validate(function(err) {
        expect(err.errors.name).to.exist;
      });
    });
    it('should accept a valid name', function() {
      let toAccept = new User();
      toAccept.name = 'abadra kensquke\'`el kzFour';
      toAccept.validate(function(err) {
        if (err) {
          expect(err.errors.name).to.not.exist;
        }
        else {
          expect(err).to.not.exist;
        }
      });
    });
  });

  // User.email tests
  describe('email is a valid format', function() {
    it('should reject a missing @', function() {
      let toReject = new User();
      toReject.email = 'noAtSign';
      toReject.validate(function(err) {
        expect(err.errors.email).to.exist;
      });
    });
    it('should confirm a valid email format', function() {
      let toAccept = new User();
      toAccept.email = 'this1@valid.org';
      toAccept.validate(function(err) {
        if (err) {
          expect(err.errors.email).to.not.exist;
        }
        else {
          expect(err).to.not.exist;
        }
      });
    });
  });
});
