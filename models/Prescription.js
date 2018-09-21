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

// // TODO add a hook to update User model
// // NOTE after create, change relevant User's .prescription to point to this.id
presciptionSchema.post('save', function(doc) {
  const thisPrescriptsId = mongoose.TYpes.ObjectId(doc.id);
  console.log('doc is:', doc);
  // find the client's user model
  User.update({ _id: doc.client }, { $set: { prescription: thisPrescriptsId } },
    finishedUpdateAttempt);
});

// helper callback function to notify end of update attempt
function finishedUpdateAttempt() {
  console.log('finished update attempt');
}

module.exports = mongoose.model('Prescription', presciptionSchema);
