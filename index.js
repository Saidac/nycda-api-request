//  API REQUEST APP
const express = require('express'),
      request = require('request'),
      pug = require('pug'),
      morgan = require('morgan');
      GITHUB_API_SERVER = 'https://api.github.com';

var app = express();

const BaseRequest = request.defaults({
  headers: {
    'User-Agent': 'Williams super JS code'
  }
});

app.set('view engine', 'pug');

app.use(morgan('dev'));

app.get('/:username', (req, res) => {
  BaseRequest.get(GITHUB_API_SERVER + '/users/' + req.params.username, (error, response, body) => {
    if (!error) {
      res.render('users/show', { user: JSON.parse(body) });
    } else {
      res.status(500).end();
    }
  });
});

app.get('/api/:username', (req, res) => {
  BaseRequest.get(GITHUB_API_SERVER + '/users/' + req.params.username, (error, response, body) => {
    if (!error) {
      res.json(JSON.parse(body));
    } else {
      res.status(500).end();
    }
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
