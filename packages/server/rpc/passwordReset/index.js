const { method } = require('@bufferapp/micro-rpc');

module.exports = method(
  'passwordReset',
  'a rpc endpoint to reset a password',
  async () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('OK');
      }, 2000);
    })
  ,
);
