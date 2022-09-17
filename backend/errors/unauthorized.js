const { StatusCode } = require('../constants/api');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCode.UNAUTHORIZED;
  }
}

module.exports = Unauthorized;
