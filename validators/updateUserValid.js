const { celebrate, Joi } = require('celebrate');

const updateUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

module.exports = { updateUserValid };
