// load web framework
const express = require('express');
// load req/res data formmater
const bodyParser = require('body-parser');
// start app
const app = express();

// activate body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// load controllers
app.use('/auth', require('./controllers/Auth'));

// start listening
app.listen(3000, function() {
  console.log('Server listening');
});
