const express = require('express');
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const { NotFound } = require('../errors/NotFound');
const { login, createUser } = require('../controllers/users');

router.all('*', express.json());

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  }),
  createUser,
);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.all('*', auth);

router.use('/users', users);
router.use('/movies', movies);

router.all('*', (req, res, next) => {
  next(new NotFound('Запрос не найден'));
});

module.exports = router;
