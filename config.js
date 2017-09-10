'use strict';

// Hierarchical node.js configuration with command-line arguments, environment
// variables, and files.
const nconf = module.exports = require('nconf');
const path = require('path');

nconf
// 1. Command-line arguments
.argv()
// 2. Environment variables
.env([
  'PROXY_WEBCLIENT',
  'PROXY_BOTCONNECTOR',
  'PORT',
  'GET_API_PORT',
  'SECRET',
  'SUBSCRIPTION_NAME',
  'TOPIC_NAME',
  'NODE_ENV',
])
// 3. Config file
.file({ file: path.join(__dirname, 'config.json') })
// 4. Defaults
.defaults({
  PROXY_WEBCLIENT: 'localhost:3000/whatsapp',
  PROXY_BOTCONNECTOR : 'localhost:3978/api/messages',
  PORT: 3978,
  GET_API_PORT : 4000,
  // Set this a secret string of your choosing
  SECRET: 'apiGate',
  SUBSCRIPTION_NAME: 'messageConnectors',
  TOPIC_NAME: 'message-connectors-queue'
});

// Check for required settings
checkConfig('PROXY_WEBCLIENT');
checkConfig('PORT');
checkConfig('GET_API_PORT');

function checkConfig (setting) {
  if (!nconf.get(setting)) {
    throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
  }
}
