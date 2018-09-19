const seeder = require('mongoose-seed');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/homePT', function() {

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
        'video': 'https://www.youtube.com/watch?v=o5b0gS7wI1k',
        'name': 'Knee'
      },
      {
        'video': 'https://www.youtube.com/watch?v=DoR9H9zuJPY',
        'name': 'Arm and Hand'
      },
      {
        'video': 'https://www.youtube.com/watch?v=BQ8uSKQBias',
        'name': 'Shoulder'
      },
      {
        'video': 'https://www.youtube.com/watch?v=3o2vVv__W14',
        'name': 'Arm One'
      },
      {
        'video': 'https://www.youtube.com/watch?v=0GkA21ngLG0',
        'name': 'Arm Two'
      },
      {
        'video': 'https://www.youtube.com/watch?v=A7OTduW8QqI',
        'name': 'Hip One'
      },
      {
        'video': 'https://www.youtube.com/watch?v=z1fzp7aD6gY',
        'name': 'Hip Two'
      },
      {
        'video': 'https://www.youtube.com/watch?v=J0AuYKoJB-A',
        'name': 'Rotator Cuff'
      },
      {
        'video': 'https://www.youtube.com/watch?v=NM3z8oQsK_U',
        'name': 'Back'
      },
      {
        'video': 'https://www.youtube.com/watch?v=fBpYx1XsMqg',
        'name': 'Upper Back and Neck'
      },
    ]
  }
];
