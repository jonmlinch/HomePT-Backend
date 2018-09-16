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
    maxlength: 40
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 24
  }
});

// exclude password from being sent through API requests
userSchema.set('toJSON', {
  transform: function(doc, user, options) {
    const returnJson = {
      id: user._id,
      email: user.email,
      name: user.name
    };
    return returnJson;
  }
});

userSchema.methods.authenticated = function(password) {
  return bcrypt.compareSync(password, this.password);
}

/* next is pausing the function and hashSync is pausing the db save
 * (next prevents the subsequent function from executing and hashSync prevents
 * the next call from being sent too early) */
// pre is Mongoose's version of a before hook, in this case before 'save'
userSchema.pre('save', function(next) {
  const hash = bcrypt.hashSync(this.password, 11);
  // store the hash as the user's password
  this.password = hash;
  next();
});

// let User model be used by other files
module.exports = mongoose.model('User', userSchema);
