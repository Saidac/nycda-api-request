//  API REQUEST APP
const express = require('express'),
      request = require('request'),
      pug = require('pug'),
      morgan = require('morgan');
      COINMARKETCAP_API_SERVER = 'https://api.coinmarketcap.com/v1/ticker/';

var app = express();

const BaseRequest = request.defaults({
  headers: {
    'Coin-Agent': 'Williams super JS code'
  }
}) ;

app.set('view engine', 'pug');

app.use(morgan('dev'));

app.get('/:id', (req, res) => {
  BaseRequest.get(COINMARKETCAP_API_SERVER + '/coins/' + req. params.id, (error, response, body) => {
    if (!error) {
      console.log(body);
      res.render('coins/show', { coin: JSON.parse(body) });
    } else {
      res.status(500).end();
    }
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
