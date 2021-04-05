const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { mongoURL } = require('./config/index');

const app = express();

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT);
