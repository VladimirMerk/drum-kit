'use strict';
var express = require('express');
var app = express();
app.use(express.static(`${__dirname}/public`));
app.use('/dist', express.static(`${__dirname}/dist`));
app.use('/dist/assets', express.static(`${__dirname}/node_modules/normalize.css`));
const PORT = process.env.PORT || "8000";

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(PORT, function () {
  console.log(`Drum Kit app listening on port ${PORT}!`);
});
