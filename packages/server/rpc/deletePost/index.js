const { method, createError } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');

module.exports = method(
  'deletePost',
  'delete post',
  ({ updateId }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/updates/${updateId}/destroy.json`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.accessToken,
      },
    })
    .then(() => 'OK')
    .catch((err) => {
      throw createError({ message: err.message });
    }),
);
