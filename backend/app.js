const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./midlewares/auth');
const { handleError } = require('./midlewares/error');
const { requestLogger, errorLogger } = require('./midlewares/logger');
const { validationModel } = require('./constants/validation');
const NotFound = require('./errors/not-found');
require('dotenv').config();

const { PORT = 3200 } = process.env;

const options = {
  origin: [
    'http://localhost:3000',
    'http://mesto1231.nomoredomains.sbs',
    'https://mesto1231.nomoredomains.sbs',
    'https://katuxa1231.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const app = express();
app.use(cors(options));
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate({
  body: {
    email: validationModel.user.email,
    password: validationModel.user.password,
  },
}), login);
app.post('/signup', celebrate({
  body: validationModel.user,
}), createUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/*', () => {
  throw new NotFound('Путь не существует');
});
app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(PORT);
