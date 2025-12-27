const db = require('../configs/db.js');
const validator = require('validator');
const userSchema = new db.Schema({
  username: {
    type: String,
    unique: true,
    minLength: [5, 'Choose another username'],
    maxLength: [32, 'Choose another username'],
  },
  email: {
    type: String,
    validate: {
      validator: (item) => {
        return validator.isEmail(item);
      },
    },
  },
});

const User = new db.model('User', userSchema);


module.exports = User;
