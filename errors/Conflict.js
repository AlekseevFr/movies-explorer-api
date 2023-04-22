const { CODES } = require('../constants');

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODES.CONFLICT;
  }
}

module.exports = { Conflict };
