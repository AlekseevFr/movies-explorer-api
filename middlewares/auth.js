const jwt = require('jsonwebtoken');
const { UnAuthorized } = require('../errors/UnAuthorized');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnAuthorized('Необходима авторизация');
    }
    let payload;
    const token = authorization.replace('Bearer ', '');

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
    } catch (err) {
      throw new UnAuthorized('Необходима авторизация');
    }
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};
