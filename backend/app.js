/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const defaultError = require('./middlewares/defaultError');
const router = require('./routes');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors);

mongoose.connect('mongodb://127.0.0.1:27017/mestodbe');
app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(defaultError);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listen port ${PORT}`);
});
