const { method, createError } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');

module.exports = method(
  'bufferApi',
  'communicate with buffer api',
  ({ url, args }, { session }) => rp({
    uri: `${process.env.API_ADDR}${url}`,
    method: 'POST',
    strictSSL: process.env.NODE_ENV !== 'development',
    form: Object.assign(args, {
      access_token: session.accessToken,
    }),
  })
    .catch((err) => {
      console.log('ERR: ', err);
      if (err.error && err.error.error) {
        throw createError({ message: err.error.error });
      } else {
        throw err;
      }
    })
    .then(result => JSON.parse(result)),
);
