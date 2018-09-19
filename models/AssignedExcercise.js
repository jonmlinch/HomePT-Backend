// ORM
const mongoose = require('mongoose');

const assignedExcerciseSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' },
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AssignedExcercise', assignedExcercise);
