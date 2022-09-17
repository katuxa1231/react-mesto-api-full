const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../constants/keys');
const { StatusCode, errorMessage } = require('../constants/api');
const Unauthorized = require('../errors/unauthorized');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  let payload;

  try {
    payload = jwt.verify(token, PRIVATE_KEY);
  } catch (err) {
    next(new Unauthorized(errorMessage[StatusCode.UNAUTHORIZED]));
    return;
  }

  req.user = payload;

  next();
};
