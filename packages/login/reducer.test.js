import deepFreeze from 'deep-freeze';
import { actionTypes } from '@bufferapp/async-data-fetch';
import reducer, { actions } from './reducer';

describe('reducer', () => {
  it('should handle CHECKED_COOKIE action', () => {
    const stateAfter = {
      loggedIn: false,
      loggingIn: false,
      checkedCookie: true,
    };
    const action = actions.checkedCookie();
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });
  it('should return initial state', () => {
    const stateAfter = {
      loggedIn: false,
      loggingIn: false,
      checkedCookie: false,
    };
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should handle `login_FETCH_SUCCESS` action', () => {
    const sessionToken = 'session token';
    const stateBefore = {};
    const stateAfter = {
      loggedIn: true,
      loggingIn: false,
      sessionToken,
    };
    const action = {
      type: `login_${actionTypes.FETCH_SUCCESS}`,
      result: {
        token: sessionToken,
      },
    };
    deepFreeze(action);
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  it('should handle `logout_FETCH_START` action', () => {
    const sessionToken = 'session token';
    const stateBefore = {
      sessionToken,
    };
    const stateAfter = {
      loggingIn: false,
      loggedIn: false,
    };
    const action = {
      type: `logout_${actionTypes.FETCH_START}`,
    };
    deepFreeze(action);
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});
