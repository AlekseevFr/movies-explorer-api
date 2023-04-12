const express = require('express');

const router = require('express').Router();

// const { celebrate, Joi } = require('celebrate');
const users = require('./users');
const movies = require('./movies');
const { NotFound } = require('../errors/NotFound');

router.all('*', express.json());

router.use('/users', users);

router.use('/movies', movies);

router.all('*', (req, res, next) => {
  next(new NotFound('Запрос не найден'));
});
