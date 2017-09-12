const RPCClient = require('micro-rpc-client');
const { method, createError } = require('@bufferapp/micro-rpc');

const rpcClient = new RPCClient({
  url: `http://${process.env.SESSION_SVC_HOST}`,
});

module.exports = method(
  'logout',
  'logout with a session token',
  ({ token }) =>
    rpcClient.call('destroy', { token })
      .then(() => 'OK')
      .catch((err) => {
        throw createError({ message: err.message });
      }),
);
