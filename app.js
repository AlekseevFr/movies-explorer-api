require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleError } = require('./middlewares/handleError');
const { limiter } = require('./middlewares/limiter');

const router = require('./routes');

const app = express();

const {
  PORT = 3000, BASE_PATH, NODE_ENV, MONGO_DB,
} = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB : 'mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(cors());
app.use(limiter);
app.use(bodyParser.json());
app.use(requestLogger);
app.use(helmet());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(BASE_PATH);
});
