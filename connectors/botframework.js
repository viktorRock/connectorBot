'use strict';

const builder = require('botbuilder');
const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const bot = new builder.UniversalBot(connector, (session) => {
  session.send("BOT: Você disse: %s", session.message.text);
});

const registerUserConversation = (event) => {
  event.connector = "botframework";
  // TODO: Persist information here
  // console.log("############## registerUserConversation")
  // console.log(event)
};

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
  connector: connector
};
