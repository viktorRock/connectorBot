/*
  This file is reponsible for:
  - Serialization format transformation
  - Authentication
  - Maybe storing relevant data

  source: https://blog.risingstack.com/building-an-api-gateway-using-nodejs/
*/
"use strict";
var path = require('path');
const express = require('express');
const http = process.env.HTTPS == 'on' ? require('https') : require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const LOG_MODE = 'dev';
const config = require('./config');
var helmet = require('helmet');
const getApiPORT = config.get('CONNECTOR_BOT_API_PORT');

//Authorization
// TODO: add auth, I suggest passportjs
app.use((req, res, next) => {
  // TODO: my authentication logic
  next()
})


app.use(logger(LOG_MODE));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);

//segurança HTTP
app.use(helmet());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("@@@@@ Error 404 request = " + req.url);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500);
  var data = {
    message: err.message,
    error: err
  };
  if (req.xhr) {
    res.json(data);
  } else {
    res.render('error', data);
  }
});

app.listen(getApiPORT, function () {
  console.log('GET_API_PORT = ' + getApiPORT);
})
module.exports = app;
