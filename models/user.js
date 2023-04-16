const mongoose = require('mongoose');

const validator = require('validator');
const bcrypt = require('bcryptjs');

const { UnAuthorized } = require('../errors/UnAuthorized');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: validator.isEmail,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function userFind(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const error = new UnAuthorized('Неправильные почта или пароль');
        return Promise.reject(error);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            const error = new UnAuthorized('Неправильные почта или пароль');
            return Promise.reject(error);
          }
          return Promise.resolve(user);
        });
    });
};
module.exports = mongoose.model('user', userSchema);
