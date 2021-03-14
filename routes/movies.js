const router = require('express').Router();
const controller = require('../controllers/movies');
const movieDeleteValidator = require('../validators/deleteMovie');
const movieCreateValidator = require('../validators/createMovie');

router.get('/', controller.getMovies);
router.post('/', movieCreateValidator, controller.createMovie);
router.delete('/:movieId', movieDeleteValidator, controller.deleteMovie);

module.exports = router;
