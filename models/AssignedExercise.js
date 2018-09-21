/* An assigned exercise is a partial piece of a prescription. Clients may give
 * feedback per exercise to help providers during the recovery process. */
// ORM
const mongoose = require('mongoose');

// TODO validations for sane reps and frequency
const assignedExerciseSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
  date: { type: Date, default: Date.now },
  reps: String,
  freq: String
});

module.exports = mongoose.model('AssignedExercise', assignedExerciseSchema);
