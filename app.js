const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();

const { PORT = 3000, BASE_PATH } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}...`);
  console.log(BASE_PATH);
});
app.use(bodyParser.json());
