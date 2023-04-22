const jwt = require('jsonwebtoken');
const { UnAuthorized } = require('../errors/UnAuthorized');
const { MESSAGES } = require('../constants');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnAuthorized(MESSAGES.UNAUTHORIZED);
    }
    let payload;
    const token = authorization.replace('Bearer ', '');

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
    } catch (err) {
      throw new UnAuthorized(MESSAGES.UNAUTHORIZED);
    }
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};
