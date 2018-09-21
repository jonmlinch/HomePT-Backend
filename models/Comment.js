/* A comment is a single piece of feedback, by the client, to the provider.
 * Options can be made availble to link Comments to prescriptions and specific
 * assigned exercises.
 * */
// ORM
const mongoose = require('mongoose');

// TODO validations (comfort & completness sacle)
const feedbackSchema = new mongoose.Schema({
  RPEData: String,
  pain: String,
  painLocation: String,
  painSeverity: String,
  addlComments: String
});

const commentSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  feedback: feedbackSchema
});

module.exports = mongoose.model('Comment', commentSchema);
