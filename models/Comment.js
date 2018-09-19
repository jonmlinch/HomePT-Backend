// ORM
const mongoose = require('mongoose');

// TODO validations (comfort & completness sacle)
const feedbackSchema = new mongoose.Schema({
  comfort: Number,
  completeness: Number,
  text: String
});

const commentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  excercise: { type: mongoose.Schema.Types.ObjectId, ref: 'AssignedExcercise' },
  date: { type: Date, default: Date.now },
  feedback: feedbackSchema
});

module.exports = mongoose.model('Comment', commentSchema);
