const { StatusCode } = require('../constants/api');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCode.FORBIDDEN;
  }
}

module.exports = Forbidden;
