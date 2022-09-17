const mongoose = require('mongoose');
const { StatusCode, errorMessage } = require('../constants/api');

module.exports.handleError = (err, req, res, next) => {
  const { message, statusCode = StatusCode.INTERNAL_SERVER_ERROR } = err;

  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    res.status(StatusCode.BAD_REQUEST).send({ message: errorMessage[StatusCode.BAD_REQUEST] });
    return;
  }

  if (err.code === 11000) {
    res.status(StatusCode.CONFLICT).send({ message: errorMessage[StatusCode.CONFLICT] });
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === StatusCode.INTERNAL_SERVER_ERROR
        ? errorMessage[StatusCode.INTERNAL_SERVER_ERROR](err.message)
        : message,
    });
  next();
};
