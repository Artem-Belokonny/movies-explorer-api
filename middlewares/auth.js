const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');
const { secret } = require('../config/index');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Не хватает прав доступа (нет токена)');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, secret);
    req.user = payload;
  } catch (err) {
    throw new Unauthorized('Не хватает прав доступа (нет токена)');
  }
  next();
};

module.exports = auth;
