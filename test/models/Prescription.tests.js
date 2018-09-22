const mongoose = require('mongoose');
// unit test suite for wish model
describe('Prescription Model Unit Tests', function() {

  // for db connection & models
  const db = require('../../models');
  // overwrite mongoDB connection
  mongoose.connect('mongodb://localhost/test_homePT',
    { useNewUrlParser: true });
  // for chai's expect BDD syntax
  const expect = require('chai').expect;

  beforeEach(async function() {
    // create client
    await db.User.create({
      email: 'first@client.org',
      name: 'first client',
      password: 'atleast6char',
      type: 'client'
    })
      .catch(function(err) {
        console.log('err in setup creating first client:', err);
      });
    // create provider
    await db.User.create({
      email: 'first@provider.org',
      name: 'first provider',
      password: 'atleast6char',
      type: 'provider'
    })
      .catch(function(err) {
        console.log('err in setup creating first provider:', err);
      });
  });

  //
  // teardown
  //

  afterEach(async function() {
    // remove any user documents
    await db.User.deleteMany()
      .catch(err => {
        console.log('err emptying Users collection:', err);
      });
  });

  // Prescription.create tests
  describe('duplicate user may not be created', function() {
    it('should not allow a duplicate email to be added', async function() {
      await db.User.create({ email: 'this@isOkay.org', name: 'any', password:
        'thisisvalid', type: 'client' })
        .then(function(success) {
          expect(success).to.not.exist;
        })
        .catch(function(err) {
          expect(err).to.exist;
        });
    });
  });
});
