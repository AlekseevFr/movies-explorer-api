const { CODES } = require('../constants');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODES.FORBIDDEN;
  }
}
module.exports = { Forbidden };
