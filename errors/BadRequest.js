const { CODES } = require('../constants');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODES.BAD_REQUEST;
  }
}

module.exports = { BadRequest };
