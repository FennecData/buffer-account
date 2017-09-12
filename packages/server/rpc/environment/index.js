const { method } = require('@bufferapp/micro-rpc');

module.exports = method(
  'environment',
  'return node environment string',
  () => ({ environment: process.env.NODE_ENV }),
);
