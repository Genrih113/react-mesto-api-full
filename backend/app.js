require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { setCustomErrorStatusAndMessage, sendError } = require('./helpers/error-handling-helpers');
const { celebrateForSignin, celebrateForSignup } = require('./middlewares/joi-request-schemas');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger); // подключаем логгер запросов

//  эта директива для проверки восстановления сервера с помощью pm2
//  удалить после сдачи 15й работы
app.get('/crash-test', () => {
  setTimeout(() => {
    const err = new Error();
    err.message = 'Ой-ой доска кончается- сейчас я упаду';
    throw err;
  }, 0);
});

app.post('/signin', celebrateForSignin, login);
app.post('/signup', celebrateForSignup, createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', () => {
  setCustomErrorStatusAndMessage(404, 'Запрашиваемый ресурс не найден');
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res) => {
  sendError(err, res);
});

app.listen(PORT);
