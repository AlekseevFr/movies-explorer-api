const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const { saveMovieValid } = require('../validators/createMovieValid');
const { deleteMovieValid } = require('../validators/deleteMovieValid');

router.get('/', getMovies);
router.post('/', saveMovieValid, createMovie);
router.delete('/:_id', deleteMovieValid, deleteMovie);

module.exports = router;
