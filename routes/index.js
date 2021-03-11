const router = require('express').Router();

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const controller = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');
const registerValidator = require('../validators/register');
const authValidator = require('../validators/auth');

router.post('/signin', authValidator, controller.login);
router.post('/signup', registerValidator, controller.createUser);
router.use('/users', authMiddleware, userRoutes);
router.use('/movies', authMiddleware, movieRoutes);
router.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = router;
