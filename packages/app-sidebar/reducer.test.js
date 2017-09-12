import {
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import deepFreeze from 'deep-freeze';
import reducer from './reducer';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = {
      user: {
        loading: true,
        id: '0',
        name: '...',
        email: '...',
        avatar: '',
      },
    };
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });
  it('should save user into state', () => {
    const user = {
      id: 1,
      email: 'hamish@buffer.com',
      avatar: 'http://fake.com/avatar.webm',
      loading: false,
    };
    const action = {
      type: `user_${dataFetchActionTypes.FETCH_SUCCESS}`,
      result: user,
    };
    const stateAfter = { user };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });
});
