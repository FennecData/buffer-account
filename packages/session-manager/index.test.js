import RPCClient from 'micro-rpc-client';

import {
  middleware,
  getCookie,
  writeCookie,
  cookieDomain,
  cookieName,
  createSession,
  updateSession,
  destroySession,
  serviceUrl,
} from './';

describe('SessionManager', () => {
  describe('middleware.getSession', () => {
    it('should handle missing session cookie', () => {
      const req = {
        cookies: [],
      };
      const res = {};
      const next = jest.fn();
      middleware.getSession({ production: true })(req, res, next);
      expect(next)
        .toBeCalled();
    });

    it('should handle production session cookie', async () => {
      const bufferCookieName = 'buffer_session';
      const cookieValue = 'coooooookies';
      const req = {
        cookies: {
          [bufferCookieName]: cookieValue,
        },
      };
      const sessionUrl = 'someSessionUrl';
      const sessionKeys = ['*'];
      const res = {};
      const next = jest.fn();
      const configuredMiddlware = middleware.getSession({
        production: true,
        sessionUrl,
        sessionKeys,
      });
      await configuredMiddlware(req, res, next);
      expect(next)
        .toBeCalled();
      expect(RPCClient.prototype.call)
        .toBeCalledWith('get', {
          token: cookieValue,
          keys: sessionKeys,
        });
      expect(req.session)
        .toEqual(RPCClient.fakeSession);
    });

    it('should handle session service failure', async () => {
      const bufferCookieName = 'buffer_session';
      const cookieValue = 'brokenCookie';
      const req = {
        cookies: {
          [bufferCookieName]: cookieValue,
        },
      };
      const sessionUrl = 'someSessionUrl';
      const sessionKeys = ['*'];
      const res = {};
      const next = jest.fn();

      const configuredMiddlware = middleware.getSession({
        production: true,
        sessionUrl,
        sessionKeys,
      });
      await configuredMiddlware(req, res, next);
      expect(next)
        .toBeCalledWith(new Error(RPCClient.fakeErrorMessage));
    });
  });

  describe('getCookie', () => {
    it('should get a cookie from a request in production', () => {
      const name = 'buffer_session';
      const value = 'coooooookies';
      const req = {
        cookies: {
          [name]: value,
        },
      };
      expect(getCookie({
        name,
        req,
      }))
        .toBe(value);
    });

    it('should return undefined if not exists', () => {
      const name = 'nope';
      const req = {
        cookies: {},
      };
      expect(getCookie({
        name,
        req,
      }))
        .toBeUndefined();
    });
  });

  describe('cookieName', () => {
    it('should get a production cookie name', () => {
      expect(cookieName({ production: true }))
        .toBe('buffer_session');
    });

    it('should get a development cookie name', () => {
      expect(cookieName({ production: false }))
        .toBe('local_buffer_session');
    });
  });

  describe('middleware.validateSession', () => {
    it('should call next with valid session', async () => {
      const requiredSessionKey = 'publish';
      const requiredSessionKeys = [`${requiredSessionKey}.accessToken`];
      const req = {
        session: {
          [requiredSessionKey]: {
            accessToken: 'someAccessToken',
          },
        },
      };
      const res = {};
      const next = jest.fn();
      const configuredMiddlware = middleware.validateSession({
        requiredSessionKeys,
      });
      await configuredMiddlware(req, res, next);
      expect(next)
        .toBeCalled();
    });

    it('should call production redirect with invalid session', async () => {
      const requiredSessionKeys = ['nope.accessToken'];
      const host = 'someHost';
      const originalUrl = '/someUrl';
      const redirect = encodeURIComponent(`https://${host}${originalUrl}`);
      const accountUrl = 'https://account.buffer.com/login/';
      const req = {
        session: {},
        originalUrl,
        get: () => host,
      };
      const res = {
        redirect: jest.fn(),
      };
      const next = jest.fn();
      const configuredMiddlware = middleware.validateSession({
        requiredSessionKeys,
        production: true,
      });
      await configuredMiddlware(req, res, next);
      expect(next)
        .not.toBeCalled();
      expect(res.redirect)
        .toBeCalledWith(`${accountUrl}?redirect=${redirect}`);
    });

    it('should call dev redirect with invalid session', async () => {
      const requiredSessionKeys = ['nope.accessToken'];
      const host = 'someHost';
      const originalUrl = '/someUrl';
      const redirect = encodeURIComponent(`https://${host}${originalUrl}`);
      const accountUrl = 'https://account.local.buffer.com/login/';
      const req = {
        session: {},
        originalUrl,
        get: () => host,
      };
      const res = {
        redirect: jest.fn(),
      };
      const next = jest.fn();
      const configuredMiddlware = middleware.validateSession({
        requiredSessionKeys,
        production: false,
      });
      await configuredMiddlware(req, res, next);
      expect(next)
        .not.toBeCalled();
      expect(res.redirect)
        .toBeCalledWith(`${accountUrl}?redirect=${redirect}`);
    });

    it('should call redirect with invalid session (missing one)', async () => {
      const host = 'someHost';
      const originalUrl = '/someUrl';
      const requiredSessionKeys = ['hello.token', 'nope.accessToken'];
      const req = {
        session: {
          hello: {
            token: ':wave:',
          },
        },
        originalUrl,
        get: () => host,
      };
      const res = {
        redirect: jest.fn(),
      };
      const next = jest.fn();
      const configuredMiddlware = middleware.validateSession({
        requiredSessionKeys,
      });
      await configuredMiddlware(req, res, next);
      expect(next)
        .not.toBeCalled();
      expect(res.redirect)
        .toBeCalled();
    });

    it('should call redirect when session is missing', async () => {
      const host = 'someHost';
      const originalUrl = '/someUrl';
      const req = {
        originalUrl,
        get: () => host,
      };
      const res = {
        redirect: jest.fn(),
      };
      const next = jest.fn();
      const configuredMiddlware = middleware.validateSession({
        requiredSessionKeys: [],
        production: true,
      });
      await configuredMiddlware(req, res, next);
      expect(next)
        .not.toBeCalled();
      expect(res.redirect)
        .toBeCalled();
    });
  });

  describe('createSession', () => {
    it('should create a new session in production', async () => {
      const res = {
        cookie: jest.fn(),
      };
      const sessionClient = new RPCClient({ url: 'sometesturl' });
      const expectedSession = {};
      const { token, session } = await createSession({
        session: expectedSession,
        res,
        sessionClient,
        production: true,
      });
      expect(RPCClient.prototype.call)
        .toBeCalledWith('create', { session: expectedSession });
      expect(token)
        .toBe(RPCClient.fakeAccessToken);
      expect(session)
        .toEqual(expectedSession);
      expect(res.cookie)
        .toBeCalledWith('buffer_session', RPCClient.fakeAccessToken, {
          domain: '.buffer.com',
          maxAge: 365 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: true,
        });
    });

    it('should create a new session in dev', async () => {
      const res = {
        cookie: jest.fn(),
      };
      const sessionClient = new RPCClient({ url: 'sometesturl' });
      const expectedSession = {};
      const { token, session } = await createSession({
        session: expectedSession,
        res,
        sessionClient,
        production: false,
      });
      expect(RPCClient.prototype.call)
        .toBeCalledWith('create', { session: expectedSession });
      expect(token)
        .toBe(RPCClient.fakeAccessToken);
      expect(session)
        .toEqual(expectedSession);
      expect(res.cookie)
        .toBeCalledWith('local_buffer_session', RPCClient.fakeAccessToken, {
          domain: '.local.buffer.com',
          maxAge: 365 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: true,
        });
    });

    it('should handle create session errors', async () => {
      const res = {
        cookie: jest.fn(),
      };
      const sessionClient = new RPCClient({ url: 'sometesturl' });
      const expectedSession = {
        broken: true,
      };
      try {
        await createSession({
          session: expectedSession,
          res,
          sessionClient,
          production: true,
        });
        throw new Error('This should break');
      } catch (err) {
        expect(err.message)
          .toBe(RPCClient.fakeErrorMessage);
      }
    });
  });

  describe('updateSession', () => {
    it('should update a session in production', async () => {
      const name = 'buffer_session';
      const value = 'coooooookies';
      const req = {
        cookies: {
          [name]: value,
        },
      };
      const sessionClient = new RPCClient({ url: 'sometesturl' });
      const expectedSession = {};
      await updateSession({
        session: expectedSession,
        req,
        sessionClient,
        production: true,
      });
      expect(RPCClient.prototype.call)
        .toBeCalledWith('update', {
          session: expectedSession,
          token: value,
        });
    });

    it('should update a session in dev', async () => {
      const name = 'local_buffer_session';
      const value = 'coooooookiez';
      const req = {
        cookies: {
          [name]: value,
        },
      };
      const sessionClient = new RPCClient({ url: 'sometesturl' });
      const expectedSession = {};
      await updateSession({
        session: expectedSession,
        req,
        sessionClient,
        production: false,
      });
      expect(RPCClient.prototype.call)
        .toBeCalledWith('update', {
          session: expectedSession,
          token: value,
        });
    });

    it('should throw update session errors', async () => {
      const name = 'buffer_session';
      const value = 'coooooookies';
      const req = {
        cookies: {
          [name]: value,
        },
      };
      const sessionClient = new RPCClient({ url: 'sometesturl' });
      const expectedSession = {
        broken: true,
      };
      try {
        await updateSession({
          session: expectedSession,
          req,
          sessionClient,
          production: true,
        });
        throw new Error('This should break');
      } catch (err) {
        expect(err.message)
          .toBe(RPCClient.fakeErrorMessage);
      }
    });
  });

  describe('cookieDomain', () => {
    it('should get a production cookie name', () => {
      expect(cookieDomain({ production: true }))
        .toBe('.buffer.com');
    });

    it('should get a development cookie name', () => {
      expect(cookieDomain({ production: false }))
        .toBe('.local.buffer.com');
    });
  });

  describe('writeCookie', () => {
    it('should write a production cookie', () => {
      const res = {
        cookie: jest.fn(),
      };
      const name = 'someCookieName';
      const value = 'someCookieValue';
      const domain = 'someCookieDomain';
      writeCookie({
        name,
        value,
        domain,
        res,
      });
      expect(res.cookie)
        .toBeCalledWith(
          name,
          value, {
            domain,
            maxAge: 365 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
          });
    });
  });

  describe('destroySession', () => {
    it('should destroy a session', async () => {
      const name = 'buffer_session';
      const value = 'coooooookies';
      const req = {
        cookies: {
          [name]: value,
        },
      };
      const res = {
        clearCookie: jest.fn(),
        send: jest.fn(),
      };
      const sessionClient = new RPCClient({ url: 'sometesturl' });
      await destroySession({
        req,
        res,
        sessionClient,
        production: true,
      });
      expect(RPCClient.prototype.call)
        .toBeCalledWith('destroy', {
          token: value,
        });
      expect(res.clearCookie)
        .toBeCalledWith('buffer_session', {
          domain: '.buffer.com',
        });
      expect(res.clearCookie)
        .toBeCalledWith('bufferapp_ci_session', {
          domain: '.buffer.com',
        });
    });

    it('should destroy a dev session', async () => {
      const name = 'local_buffer_session';
      const value = 'coooooookies';
      const req = {
        cookies: {
          [name]: value,
        },
      };
      const res = {
        clearCookie: jest.fn(),
        send: jest.fn(),
      };
      const sessionClient = new RPCClient({ url: 'sometesturl' });
      await destroySession({
        req,
        res,
        sessionClient,
        production: false,
      });
      expect(RPCClient.prototype.call)
        .toBeCalledWith('destroy', {
          token: value,
        });
      expect(res.clearCookie)
        .toBeCalledWith(name, {
          domain: '.local.buffer.com',
        });
      expect(res.clearCookie)
        .toBeCalledWith('localbufferapp_ci_session', {
          domain: '.buffer.com',
        });
    });

    it('should handle destory session failure', async () => {
      const name = 'buffer_session';
      const req = {
        cookies: {
          [name]: 'brokenToken',
        },
      };
      const res = {};
      const sessionClient = new RPCClient({ url: 'sometesturl' });
      try {
        await destroySession({
          res,
          req,
          sessionClient,
          production: true,
        });
        throw new Error('This should break');
      } catch (err) {
        expect(err.message)
          .toBe(RPCClient.fakeErrorMessage);
      }
    });
  });

  describe('serviceUrl', () => {
    it('should return production service url', () => {
      const expectedServiceUrl = 'https://account.buffer.com';
      expect(serviceUrl({ production: true }))
        .toBe(expectedServiceUrl);
    });

    it('should return dev service url', () => {
      const expectedServiceUrl = 'https://account.local.buffer.com';
      expect(serviceUrl({ production: false }))
        .toBe(expectedServiceUrl);
    });
  });
});
