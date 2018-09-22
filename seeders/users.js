const seeder = require('mongoose-seed');
require('dotenv').config();

// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGODB_URI || 'mongodb://localhost/homePT', function() {

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
    'model': 'User',
    'documents': [
      {
        'email': 'provider@provider.org',
        'name': 'admin provider',
        'password': 'iamadmin',
        'type': 'provider',
        'admin': true
      },
      {
        'email': 'client@client.org',
        'name': 'admin client',
        'password': 'iamadmin',
        'type': 'client',
        'admin': true
      }
    ]
  }
];
