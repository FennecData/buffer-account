const rp = jest.fn((options) => {
  if (options.uri.endsWith('/1/user/signin.json')) {
    return Promise.resolve({
      token: 'token',
    });
  }
});

module.exports = rp;
