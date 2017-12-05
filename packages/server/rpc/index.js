const { rpc } = require('@bufferapp/micro-rpc');
const checkToken = require('./checkToken');
const exampleMethod = require('./example');
const passwordResetMethod = require('./passwordReset');

module.exports = checkToken(rpc(
  exampleMethod,
  passwordResetMethod,
));
