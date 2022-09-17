const { StatusCode } = require('../constants/api');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCode.BAD_REQUEST;
  }
}

module.exports = BadRequest;
