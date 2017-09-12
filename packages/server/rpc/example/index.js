const { method } = require('@bufferapp/micro-rpc');

module.exports = method(
  'example',
  'an example rpc endpoint',
  () => 'OK',
);
