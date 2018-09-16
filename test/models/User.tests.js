// for User model to test
const User = require('../../models/User');
// for chai's expect BDD syntax
const expect = require('chai').expect;

// unit test suite for wish model
describe('User Model Unit Tests', function() {

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
