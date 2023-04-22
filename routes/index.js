const express = require('express');
const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const { NotFound } = require('../errors/NotFound');
const { login, createUser } = require('../controllers/users');
const { upValid, inValid } = require('../validators/signValid');
const { MESSAGES } = require('../constants');

router.all('*', express.json());

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.post('/signup', upValid, createUser);
router.post('/signin', inValid, login);

router.all('*', auth);

router.use('/users', users);
router.use('/movies', movies);

router.all('*', (req, res, next) => {
  next(new NotFound(MESSAGES.NOT_FOUND));
});

module.exports = router;
