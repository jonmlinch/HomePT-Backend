const seeder = require('mongoose-seeder'),
    data = require('./provider_with_clients.json');

seeder.seed(data).then(function(dbData) {
    // The database objects are stored in dbData
}).catch(function(err) {
    // handle error
});
