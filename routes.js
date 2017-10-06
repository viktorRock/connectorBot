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

const clientProxyURI = config.get('CONNECTOR_BOT_PROXY_WEBCLIENT')
const userServiceProxy = httpProxy(clientProxyURI);
const LOG_PREFFIX = "#connectorBot: ";
const BOTFRAMEWORK_MESSAGE = "message";
const BOTFRAMEWORK_CONV_UPDATE = "conversationUpdate";
//adding botframework connector
const botframework = require('./connectors/botframework');

router.post('/api/messages', function(req, res, next){
  console.log("type = " + req.body.type);
  // console.log(req.body);

  if(req.body.type == BOTFRAMEWORK_MESSAGE){
    userServiceProxy(req,res);
  }
  // userServiceProxy(req,res);
  next();
}, botframework.connector.listen());

router.post('/connector/messages', function(req, res, next){
  var msg = req.body;

  console.log(msg);
  let session = botframework.findSession(msg.id);

  //sessao do usuário do GoChannel
  if(session){
    // console.log("User %s disse %s", msg['msg[contato]'], msg['msg[mensagem]']);
    var bot = session.message.address.bot;
    let user = msg.contato;
    bot.name = user;
    session.send(msg.mensagem);

  }
});

module.exports = router;
