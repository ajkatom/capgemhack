const express = require('express');
const path = require('path');
const app = express();

app.use(require('body-parser').json());
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/styles', express.static(path.join(__dirname, '../styles')));
app.use((err, req, res, next) => {
  const message = err.errors && err.errors[0].message;
  err.message = message || err.message;
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

app.use('/api', require('./api'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});
