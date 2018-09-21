/* A prescription is a record of a single assignment of excercises to be
 * performed. It is a representation of a real world prescription written by
  * a provider to their client. */

// ORM
const mongoose = require('mongoose');
// TODO determine if this is a good require
const User = require('./User');

const presciptionSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedExercises: [{ type: mongoose.Schema.Types.ObjectId,
    ref: 'AssignedExcercise' }],
  date: { type: Date, default: Date.now }
});

// TODO add a hook to update User model
// NOTE after create, change relevant User's .prescription to point to this.id
// prescriptionSchema.post('save', function(doc) {
  // // find the client's user model
  // User.findById(doc.client)
    // .then(result => {
      // result.prescription = doc._id;
      // result.save();
    // })
    // .catch(err => {
      // console.log('err finding client to make prescript active:', err);
    // })
// });

// module.exports = mongoose.model('Prescription', presciptionSchema);
