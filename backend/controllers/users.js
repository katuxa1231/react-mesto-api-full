const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { errorMessage, StatusCode } = require('../constants/api');
const NotFound = require('../errors/not-found');
const { DEV_SECRET, COOKIE_KEY_NAME } = require('../constants/keys');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const isProd = NODE_ENV === 'production';

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        isProd ? JWT_SECRET : DEV_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie(COOKIE_KEY_NAME, token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: isProd ? 'None' : true,
        secure: isProd,
      }).send({ data: user });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie(COOKIE_KEY_NAME, {
    sameSite: isProd ? 'None' : true,
    secure: isProd,
  }).send({ status: 'Successful' });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        throw new NotFound(errorMessage[StatusCode.NOT_FOUND]);
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcryptjs.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findOneAndUpdate({ _id: req.user._id }, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findOneAndUpdate({ _id: req.user._id }, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
