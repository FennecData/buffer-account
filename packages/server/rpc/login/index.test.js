/* eslint-disable import/first */
jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import RPCClient from 'micro-rpc-client';
import login from './';

describe('rpc/login', () => {
  it('should have the expected name', () => {
    expect(login.name)
      .toBe('login');
  });

  it('should have the expected docs', () => {
    expect(login.docs)
      .toBe('login using email and password');
  });

  it('should make a request to buffer api', async () => {
    const email = 'test@test.com';
    const password = 'password';
    const clientId = 'clientId';
    const clientSecret = 'clientSecret';
    const loginData = await login.fn({
      email,
      password,
      clientId,
      clientSecret,
    });
    expect(loginData)
      .toEqual({
        token: 'someSessionToken',
      });
    expect(RPCClient.prototype.call)
      .toBeCalledWith('create', {
        session: {
          accessToken: 'token',
        },
      });
    expect(rp)
      .toBeCalledWith({
        uri: `${process.env.API_ADDR}/1/user/signin.json`,
        method: 'POST',
        strictSSL: false,
        form: {
          client_id: clientId,
          client_secret: clientSecret,
          email,
          password,
        },
        json: true,
      });
  });

  it('should make a request to buffer api with env vars', async () => {
    const email = 'test@test.com';
    const password = 'password';
    const clientId = 'clientId';
    const clientSecret = 'clientSecret';
    process.env.CLIENT_ID = clientId;
    process.env.CLIENT_SECRET = clientSecret;
    const loginData = await login.fn({
      email,
      password,
    });
    expect(loginData)
      .toEqual({
        token: 'someSessionToken',
      });
    expect(RPCClient.prototype.call)
      .toBeCalledWith('create', {
        session: {
          accessToken: 'token',
        },
      });
    expect(rp)
      .toBeCalledWith({
        uri: `${process.env.API_ADDR}/1/user/signin.json`,
        method: 'POST',
        strictSSL: false,
        form: {
          client_id: clientId,
          client_secret: clientSecret,
          email,
          password,
        },
        json: true,
      });
  });
});
