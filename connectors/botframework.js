/* ##################################################################### */
// Classe responsavel por administrar o Bot e as sessões do mesmo
// TODO Verificar se vamos precisar de mais de um Bot
// TODO Persistir sessões
/* ##################################################################### */
'use strict';

// TODO Migrar para um session store robusto (connect-redis ou cookie-session)
// https://github.com/tj/connect-redis
var sessionList =  [];

const builder = require('botbuilder');
const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const bot = new builder.UniversalBot(connector, (session) => {
  let message = session.message;
  sessionList[message.address.conversation.id] = session;
  session.send(message.user.name + " disse: %s", message.text);
});

const registerUserConversation = (event) => {
  event.connector = "botframework";
  // TODO: Persist conversations here
  // console.log("############## registerUserConversation")
  // console.log(event)
};

function findSession(conversationID){
  return sessionList[conversationID];
}

// Middleware for logging
bot.use({
  receive: function (event, next) {
    registerUserConversation(event);
    next();
  },
  send: function (event, next) {
    registerUserConversation(event);
    next();
  }
});

module.exports = {
  bot: bot,
  connector: connector,
  findSession : findSession
};
