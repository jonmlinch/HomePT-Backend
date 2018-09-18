// ORM
const mongoose = require('mongoose');

const prescriptSchema = new mongoose.Schema({
  provider: { type: Schema.Types.ObjectId, ref: 'Provider' },
  client: { type: Schema.Types.ObjectId, ref: 'Client' },
  exercise: { type: Schema.Types.ObjectId, ref: 'Exercise' }
});

module.exports = mongoose.model('Prescript', prescriptSchema);
