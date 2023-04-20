const { constants } = require('http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFound } = require('../errors/NotFound');
const { Conflict } = require('../errors/Conflict');
const { BadRequest } = require('../errors/BadRequest');
const { Internal } = require('../errors/Internal');
const { MESSAGES } = require('../constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' });
      res.status(constants.HTTP_STATUS_OK).send({ token });
    })
    .catch(next);
};
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })).then((user) => {
      const person = user.toObject();
      delete person.password;
      res.send(person);
    })
    .catch((err) => {
      if (err.code === 11000) {
        const conflictError = new Conflict(MESSAGES.USER_CONFLICT);
        next(conflictError);
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(MESSAGES.WRONG_DATA));
      } else {
        next(err);
      }
    });
};
const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFound(MESSAGES.NOT_FOUND));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные карточки'));
      } else if (err.code === 11000) {
        const conflictError = new Conflict(MESSAGES.USER_CONFLICT);
        next(conflictError);
      } else {
        const InternalError = new Internal(MESSAGES.SERVER_ERROR);
        next(InternalError);
      }
    });
};

module.exports = {
  login,
  createUser,
  updateUser,
};
