// ORM
const mongoose = require('mongoose');

// TODO validations (comfort & completness sacle)
const feedbackSchema = new mongoose.Schema({
  comfort: Number,
  completeness: Number,
  text: String
});

const commentSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' },
  date: { type: Date, default: Date.now },
  feedback: feedbackSchema
});

module.exports = mongoose.model('Feedback', commentSchema);
