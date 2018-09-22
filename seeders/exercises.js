const seeder = require('mongoose-seed');
require('dotenv').config();


// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGODB_URI || 'mongodb://localhost/homePT', function() {

  // Load Mongoose models
  seeder.loadModels([
    'models/Exercise.js'
  ]);

  // Clear specified collections
  seeder.clearModels(['Exercise'], function() {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });

  });
});

// Data array containing seed data - documents organized by Model
var data = [
  {
    'model': 'Exercise',
    'documents': [
      {
        'video': '//www.youtube.com/embed/o5b0gS7wI1k',
        'name': 'Knee'
      },
      {
        'video': '//www.youtube.com/embed/DoR9H9zuJPY',
        'name': 'Arm and Hand'
      },
      {
        'video': '//www.youtube.com/embed/BQ8uSKQBias',
        'name': 'Shoulder'
      },
      {
        'video': '//www.youtube.com/embed/3o2vVv__W14',
        'name': 'Arm One'
      },
      {
        'video': '//www.youtube.com/embed/0GkA21ngLG0',
        'name': 'Arm Two'
      },
      {
        'video': '//www.youtube.com/embed/A7OTduW8QqI',
        'name': 'Hip One'
      },
      {
        'video': '//www.youtube.com/embed/z1fzp7aD6gY',
        'name': 'Hip Two'
      },
      {
        'video': '//www.youtube.com/embed/J0AuYKoJB-A',
        'name': 'Rotator Cuff'
      },
      {
        'video': '//www.youtube.com/embed/NM3z8oQsK_U',
        'name': 'Back'
      },
      {
        'video': '//www.youtube.com/embed/fBpYx1XsMqg',
        'name': 'Upper Back and Neck'
      },
    ]
  }
];
