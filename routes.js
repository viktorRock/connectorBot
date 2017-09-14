/*
  This file is reponsible for:
  - Protocol transformation
  - Data aggregation
    - you should be careful with data aggregations in your API Gateway - it can
      be powerful but can also lead to domain specific data transformation or
      rule processing logic that you should avoid.
  - Maybe storing relevant data

  source: https://blog.risingstack.com/building-an-api-gateway-using-nodejs/
*/

// This loads the environment variables from the .env file
// require('dotenv-extended').load();
'use strict';

const express = require('express');
const router = express.Router();
const httpProxy = require('express-http-proxy');
const config = require('./config');
const clientProxyURI = config.get('PROXY_WEBCLIENT')
const userServiceProxy = httpProxy(clientProxyURI);
const LOG_PREFFIX = "#connectorBot: ";

//adding botframework connector
const botframework = require('./connectors/botframework');


router.post('/api/messages', function(req, res, next){
  userServiceProxy(req,res);
  next(); //Chama o botinho
}, botframework.connector.listen());

module.exports = router;
