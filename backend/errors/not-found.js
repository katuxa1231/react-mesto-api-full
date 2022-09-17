const { StatusCode } = require('../constants/api');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCode.NOT_FOUND;
  }
}

module.exports = NotFound;
