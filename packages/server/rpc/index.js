const { rpc } = require('@bufferapp/micro-rpc');
const checkToken = require('./checkToken');
const exampleMethod = require('./example');

module.exports = checkToken(rpc(
  exampleMethod,
));
