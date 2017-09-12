import {
  getProfilePageParams,
  generateProfilePageRoute,
  profilePageRoute,
 } from './index';

describe('publish-routes', () => {
  describe('getProfilePageParams', () => {
    it('should get params from path', () => {
      const profileId = '1234adf';
      const tabId = 'tabid123';
      const path = `/profile/${profileId}/tab/${tabId}`;
      expect(getProfilePageParams({ path }))
        .toEqual({
          profileId,
          tabId,
        });
    });

    it('should not get params from path with missing values', () => {
      const path = '/profile/';
      expect(getProfilePageParams({ path }))
        .toBe(null);
    });
  });

  describe('generateProfilePageRoute', () => {
    it('should generate profile route', () => {
      const profileId = '1234adf';
      const tabId = 'tabid123';
      expect(generateProfilePageRoute({
        profileId,
        tabId,
      }))
        .toBe(`/profile/${profileId}/tab/${tabId}`);
    });
  });

  describe('profilePageRoute', () => {
    it('should return profile page route template', () => {
      expect(profilePageRoute)
        .toBe('/profile/:profileId/tab/:tabId');
    });
  });
});
