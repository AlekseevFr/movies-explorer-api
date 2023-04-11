const express = require('express');

const router = require('express').Router();

// const { celebrate, Joi } = require('celebrate');
const users = require('./users');
const movies = require('./movies');

router.all('*', express.json());

router.use('/users', users);

router.use('/movies', movies);
