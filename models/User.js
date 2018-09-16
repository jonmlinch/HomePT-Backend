// ORM
const mongoose = require('mongoose');
// for password hashing
const bcrypt = require('bcrypt');

//
// validatation helper functions
// refer to https://mongoosejs.com/docs/api.html#schematype_SchemaType-validate
//

// returns true if format conforms to a broad email format, else false
const validateEmail = (email) => {
  // compare email against a regular expression to validate format
  let re = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
  return re.test(email);
}

//
// schemas
//

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Please provide an e-mail address',
    validate: [validateEmail, 'Please enter a valid e-mail address']
  },
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 20
  }
});



// let User model be used by other files
module.exports = mongoose.model('User', userSchema);
