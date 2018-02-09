import { loginServiceUrl, logoutUrl } from './urls';

describe('urls', () => {
  describe('loginServiceUrl', () => {
    it('should return production service url', () => {
      const expectedServiceUrl = 'https://login.buffer.com';
      expect(loginServiceUrl({ production: true })).toBe(expectedServiceUrl);
    });

    it('should return dev service url', () => {
      const expectedServiceUrl = 'https://login.local.buffer.com';
      expect(loginServiceUrl({ production: false })).toBe(expectedServiceUrl);
    });
  });

  describe('logoutUrl', () => {
    it('should return expected logoutUrl', () => {
      const expectedHref = 'about:blank';
      global.window.location.href = expectedHref;
      expect(logoutUrl({ production: true })).toBe(
        `https://login.buffer.com/logout/?redirect=${expectedHref}`,
      );
    });

    it('should return expected logoutUrl in dev', () => {
      const expectedHref = 'about:blank';
      global.window.location.href = expectedHref;
      expect(logoutUrl({ production: false })).toBe(
        `https://login.local.buffer.com/logout/?redirect=${expectedHref}`,
      );
    });
  });
});
