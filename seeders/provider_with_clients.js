const seeder = require('mongoose-seed');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/homePT', function() {

  // Load Mongoose models
  seeder.loadModels([
    'models/User.js'
  ]);

  // Clear specified collections
  seeder.clearModels(['User'], function() {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });

  });
});

// Data array containing seed data - documents organized by Model
var data = [
  {
    '_model': 'User',
    'documents': [
      {
        'email': 'popular@provider.org',
        'name': 'popular provider',
        'password': 'iampopular',
        'type': 'provider',
      },
    ]
  }
];
