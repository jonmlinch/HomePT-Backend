// ORM
const mongoose = require('mongoose');

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
