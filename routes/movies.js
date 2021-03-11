const router = require('express').Router();
const controller = require('../controllers/movies');

router.get('/', controller.getMovies);
router.post('/', controller.createMovie);
router.delete('/:movieId', controller.deleteMovie);

module.exports = router;
