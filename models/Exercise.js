// ORM
const mongoose = require('mongoose');

// NOTE this is an embedded document because i expect expansion
const instructionsSchema = new mongoose.Schema({
  text: String
});

const exerciseSchema = new mongoose.Schema({
  video: { // TODO validate url
    type: String
  },
  name: String,
  instructions: instructionsSchema
});

module.exports = mongoose.model('Exercise', exerciseSchema);
