const { CODES } = require('../constants');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODES.NOT_FOUND;
  }
}

module.exports = { NotFound };
