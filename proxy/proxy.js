const API_HOST = 'http://testnet.public.bluzelle.com:1317';
const PORT = process.env.PORT || 7878;
const IS_DEV = process.env.NODE_ENV === 'development';

const request = require('superagent');
const { join } = require('path');
const path = (p) => join(__dirname, p);
const express = require('express');
const app = express();
app.use(require('compression')());
app.use(require('cors')());
app.use(require('body-parser').json());
app.use(function (req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && !IS_DEV) {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
});
app.post('/', async function (req, res) {
  try {
    const { method, data, endpoint } = req.body;
    console.log('%s, %s, %o', method, endpoint, data);
    const response = request[method](API_HOST + endpoint);
    if (data) {
      response.send(data);
    }
    res.json((await response).body);
  } catch (e) {
    console.log(e.response.body);
    res.status(500).send(e.message);
  }
});
app.use(express.static(path('/../dist')));

app.get('*', function (req, res) {
  res.sendFile(path('/../dist/__app.html'));
});
app.listen(PORT);
console.log(`::${PORT}`);
