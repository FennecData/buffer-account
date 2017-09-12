const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');
const { userParser } = require('@bufferapp/publish-utils');

module.exports = method(
  'user',
  'fetch user data',
  (_, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/user.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.accessToken,
        includes: 'avatar',
      },
    })
      .then((result) => {
        const userData = JSON.parse(result);
        return userParser(userData);
      }),
);
