const { CODES } = require('../constants');

class Internal extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODES.INTERNAL;
  }
}
module.exports = { Internal };
