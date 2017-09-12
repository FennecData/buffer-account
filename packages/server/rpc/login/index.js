const { method, createError } = require('@bufferapp/micro-rpc');
const RPCClient = require('micro-rpc-client');
const rp = require('request-promise');

const rpcClient = new RPCClient({
  url: `http://${process.env.SESSION_SVC_HOST}`,
});

module.exports = method(
  'login',
  'login using email and password',
  // TODO: schema validation https://github.com/hapijs/joi
  // TODO: find a way to not use clientId and clientSecret
  ({
    email,
    password,
    clientId,
    clientSecret,
  }) => rp({
    uri: `${process.env.API_ADDR}/1/user/signin.json`,
    method: 'POST',
    strictSSL: false,
    form: {
      client_id: clientId || process.env.CLIENT_ID,
      client_secret: clientSecret || process.env.CLIENT_SECRET,
      email,
      password,
    },
    json: true,
  })
    .catch((err) => {
      if (err.error && err.error.error) {
        throw createError({ message: err.error.error });
      } else {
        throw err;
      }
    })
    .then(res => rpcClient.call('create', {
      session: {
        accessToken: res.token,
      },
    }))
    .then(({ token }) => ({ token })),
);
