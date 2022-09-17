const { Joi } = require('celebrate');
const mongoose = require('mongoose');

const linkRegExp = /https?:\/\/(www.)?[\w-]*\.\w\/?[\w\-._~:/?#[\]@!$&'()*+,;=]*/i;

const validationModel = {
  user: {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(linkRegExp),
  },
  card: {
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(linkRegExp),
  },
};

const validationParam = {
  id: Joi.string().custom((value, helpers) => {
    if (!mongoose.isObjectIdOrHexString(value)) {
      return helpers.message('Параметр невалиден');
    }
    return value;
  }),
};

module.exports = { validationModel, validationParam, linkRegExp };
