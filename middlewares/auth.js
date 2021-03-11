const jwt = require('jsonwebtoken');
const { Forbidden } = require('../errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Forbidden('Не хватает прав доступа (нет токена)');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret');
    req.user = payload;
  } catch (err) {
    throw new Forbidden('Не хватает прав доступа (нет токена)');
  }
  next();
};

module.exports = auth;
