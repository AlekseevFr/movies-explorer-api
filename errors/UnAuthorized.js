const { CODES } = require('../constants');

class UnAuthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODES.UNAUTHORIZED;
  }
}

module.exports = { UnAuthorized };
