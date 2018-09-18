// ORM
const mongoose = require('mongoose');

// TODO validations (comfort & completness sacle)
const commentsSchema = new mongoose.Schema({
  comfort: Number,
  completeness: Number,
  text: String
});

const feedbackSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  prescript: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescript' },
  comments: commentsSchema
});

module.exports = mongoose.model('Feedback', feedbackSchema);
