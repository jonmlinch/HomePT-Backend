const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  email: { // TODO determine if lowercase + unqiue is a good check
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

// compare email against a regular expression to validate format
// refer to https://mongoosejs.com/docs/api.html#schematype_SchemaType-validate
const validateEmail = (email) => {
  let re = RegEx('/\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i');
  return re.test(email);
}
