const RPCClient = jest.genMockFromModule('micro-rpc-client');
RPCClient.prototype.call = jest.fn((name) => {
  if (name === 'create') {
    return Promise.resolve({
      token: 'someSessionToken',
    });
  } else if (name === 'destroy') {
    return Promise.resolve();
  }
});
module.exports = RPCClient;
