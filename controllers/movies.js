const { constants } = require('http2');
const Movie = require('../models/movie');
const { BadRequest } = require('../errors/BadRequest');
const { Internal } = require('../errors/Internal');
const { NotFound } = require('../errors/NotFound');
const { Forbidden } = require('../errors/Forbidden');

const getMovies = (req, res, next) => {
  Movie.find({}).populate('owner').sort({ createdAt: -1 })
    .then((movies) => res.status(constants.HTTP_STATUS_OK).send({ data: movies }))
    .catch(next);
};
const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err);
        next(new BadRequest('Переданы некорректные данные фильма'));
      } else {
        next(new Internal('Ошибка сервера'));
      }
    });
};
const deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id).populate('owner')
    .then((movie) => {
      if (!movie) {
        return next(new NotFound('Фильм не найден'));
      }

      const ownerId = movie.owner.id;
      const userId = req.user._id;

      if (ownerId !== userId) {
        return next(new Forbidden('Удалить можно только свой фильм'));
      }

      return Movie.findByIdAndRemove(_id).then((resp) => res.send(resp));
    })
    .catch(next);
};
module.exports = { getMovies, createMovie, deleteMovie };
