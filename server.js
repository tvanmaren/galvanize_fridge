'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000;
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  console.log('Hello Worlds');
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
