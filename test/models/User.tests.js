
// unit test suite for wish model
describe('User Model Unit Tests', function() {

  // for User model to test
  const User = require('../../models/User');
  // for chai's expect BDD syntax
  const expect = require('chai').expect;

  /* TODO remaining tests:
   * validate password
   * correct password matches hash
   * JSON excludes password
   * password is saved as a hash */

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
    it('should accept a valid email format', function() {
      let toAccept = new User();
      toAccept.email = 'this1@valid.org';
      toAccept.validate(function(err) {
        if (err) {
          expect(err.errors.email).to.not.exist;
        }
      });
    });
  });

  // Admins may not be created
  describe('admin creation is blocked', function() {
    it('should not allow an admin to be made', function() {
      let newAdmin = new User();
      newAdmin.admin = true;
      newAdmin.validate(function(err) {
        expect(err.errors.admin).to.exist;
      });
    });
    it('should allow defaulted non-admins to be made', function() {
      let newNormie = new User();
      newNormie.validate(function(err) {
        if (err) {
          expect(err.errors.admin).to.not.exist;
        }
      });
    });
  });

  // User.type tests
  describe('type is valid', function() {
    it('should reject no match', function() {
      let toReject = new User();
      toReject.type = 'wrong';
      toReject.validate(function(err) {
        expect(err.errors.type).to.exist;
      });
    });
    it('should accept client type', function() {
      let toAccept = new User();
      toAccept.type = 'client';
      toAccept.validate(function(err) {
        if (err) {
          expect(err.errors.type).to.not.exist;
        }
      });
    });
    it('should accept provider type', function() {
      let toAccept = new User();
      toAccept.type = 'provider';
      toAccept.validate(function(err) {
        if (err) {
          expect(err.errors.type).to.not.exist;
        }
      });
    });
  });
});
