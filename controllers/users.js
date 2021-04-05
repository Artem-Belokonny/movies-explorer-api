const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret, timeToLive } = require('../config/index');
const User = require('../models/user');
const {
  NotFound, BadRequest, Unauthorized, Conflict,
} = require('../errors');

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Нет такого пользователя');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequest('Передан неверный id пользователя');
        return next(error);
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new BadRequest('Произошла ошибка при отправке данных');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequest('Передан неверный id пользователя');
        return next(error);
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name: bodyName, email: bodyEmail, password: bodyPassword,
  } = req.body;
  User.findOne({ email: bodyEmail })
    .then((user) => {
      if (user) {
        throw new Conflict('Email уже используется');
      }
      return bcrypt.hash(bodyPassword, 10);
    })
    .then((password) => User.create({
      name: bodyName, email: bodyEmail, bodyEmail, password,
    }))
    .then(({ _id, name, email }) => {
      res.send({ _id, name, email });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Не правильный email или пароль');
      }
      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: timeToLive });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUserInfo, updateUser, createUser, login,
};
