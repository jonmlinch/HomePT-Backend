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
    // create exercises
    // create assigned exercises
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
  // TODO new prescription is made active for client
  describe('prescriptions are active for proper client when made', function()
    {
      it('should be presented as a ref in client\'s prescription field',
        async function() {
          // get client
          const firstClient = await db.User.find({ where:
            { email: 'first@client.org' } });
          // get provider
          const firstProvider = await db.User.find({ where:
            { email: 'first@provider.org' } });
          // create exercises
          // create assigned exercises
          // create prescription
          await db.Prescription.create({
            provider: firstProvider._id,
            client: firstClient._id,
          })
          // expect client.prescription to be equal to prescription id
        });
  });
});
