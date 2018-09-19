// for ORM
const mongoose = require('mongoose');

// create and/or connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/homePT',
  { useNewUrlParser: true });

// Deprecation warning: https://github.com/Automattic/mongoose/issues/6922
mongoose.set('useCreateIndex', true);

// export all models
module.exports.User = require('./User');
module.exports.Exercise = require('./Exercise');
module.exports.Prescription = require('./Prescription');
module.exports.Comment = require('./Comment');
<<<<<<< HEAD
module.exports.AssignedExcercise = require('./AssignedExercise');
=======
module.exports.AssignedExercise = require('./AssignedExercise');
>>>>>>> 0b367fa32863bc0237e3fbf087f699d05d997875
