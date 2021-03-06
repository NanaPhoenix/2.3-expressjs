const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.get('/', function(req, res) {
  res.status(200).send('Hello, Express.js');
});

app.get('/hello', function(req, res) {
  res.status(200).send('Hello stranger!');
});

app.get('/hello/:name', function(req, res) {
  res.status(200).send(`Hello, ${req.params.name}!`);
});

app.all('/sub/*', function(req, res) {
  res.send(`You requested URI: ${req.originalUrl}`);
});

app.post('/post', function(req, res) {
  if (req.body && Object.key(req.body).length > 0) {
    console.log();
    res.status(200).json(req.body);
    return;
  }
  res.status(401).send('401 Authorization Required');
});

app.all('*', (req, res) => {
  res.send('Invalid format');
});

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send({error: 'Something failed! Please try again'});
});

app.listen(3000, () => {
  console.log('Server start... Waiting for connections.');
});
