const { celebrate, Joi } = require('celebrate');

const deleteMovieValid = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = { deleteMovieValid };
