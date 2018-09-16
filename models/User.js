// ORM
const mongoose = require('mongoose');
// for password hashing
const bcrypt = require('bcrypt');


// specifies when data is valid xor invalid
const userSchema = new mongoose.Schema({
  email: { // TODO determine if lowercase + unique is a good check
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Please provide an e-mail address',
    validate: [validateEmail, 'Please enter a valid e-mail address']
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  }
});

//
// validatation helper functions
// refer to https://mongoosejs.com/docs/api.html#schematype_SchemaType-validate
//

// returns true if format conforms to a broad email format, else false
const validateEmail = (email) => {
  // compare email against a regular expression to validate format
  let re = RegEx('/\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i');
  return re.test(email);
}

// let User model be used by other files
module.exports = mongoose.model('User', userSchema);
