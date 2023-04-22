const { constants } = require('http2');
const Movie = require('../models/movie');
const { BadRequest } = require('../errors/BadRequest');
const { Internal } = require('../errors/Internal');
const { NotFound } = require('../errors/NotFound');
const { Forbidden } = require('../errors/Forbidden');
const { MESSAGES } = require('../constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id }).populate('owner').sort({ createdAt: -1 })
    .then((movies) => res.status(constants.HTTP_STATUS_OK).send({ data: movies }))
    .catch(next);
};
const createMovie = (req, res, next) => {
  const {
    country,
    director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  const userId = req.user._id;

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
    movieId,
    owner: userId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        next(new BadRequest(MESSAGES.WRONG_DATA));
      } else {
        next(new Internal(MESSAGES.SERVER_ERROR));
      }
    });
};
const deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id).populate('owner')
    .then((movie) => {
      if (!movie) {
        return next(new NotFound(MESSAGES.NOT_FOUND));
      }

      const ownerId = movie.owner.id;
      const userId = req.user._id;

      if (ownerId !== userId) {
        return next(new Forbidden(MESSAGES.FORBIDDEN));
      }

      return Movie.findByIdAndRemove(_id).then((resp) => res.send(resp));
    })
    .catch(next);
};
module.exports = { getMovies, createMovie, deleteMovie };
