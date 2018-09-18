// ORM
const mongoose = require('mongoose');

const prescriptSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }
});

module.exports = mongoose.model('Prescript', prescriptSchema);
