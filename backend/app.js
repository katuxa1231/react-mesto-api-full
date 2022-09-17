const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { StatusCode } = require('./constants/api');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./midlewares/auth');
const { handleError } = require('./midlewares/error');
const { requestLogger, errorLogger } = require('./midlewares/logger');
const { validationModel } = require('./constants/validation');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);
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

app.use('/*', (req, res) => {
  res.status(StatusCode.NOT_FOUND).send({ message: 'Путь не существует' });
});
app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(PORT);
