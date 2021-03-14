const router = require('express').Router();

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const controller = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');
const registerValidator = require('../validators/register');
const authValidator = require('../validators/auth');
const { NotFound } = require('../errors');

router.post('/signin', authValidator, controller.login);
router.post('/signup', registerValidator, controller.createUser);
router.use('/users', authMiddleware, userRoutes);
router.use('/movies', authMiddleware, movieRoutes);
router.use('*', () => {
  throw new NotFound('Страница не найдена');
});

module.exports = router;
