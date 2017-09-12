import deepFreeze from 'deep-freeze';
import reducer, { actions, actionTypes } from './reducer';
import profiles from './mockData/profiles';
import lockedProfiles from './mockData/lockedProfiles';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = {
      profiles,
      lockedProfiles,
    };
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should generate a selectProfile action', () => {
    const profile = profiles[0];
    expect(actions.selectProfile({ profile }))
      .toEqual({
        type: actionTypes.SELECT_PROFILE,
        profileId: profile.id,
        profile,
      });
  });
});
