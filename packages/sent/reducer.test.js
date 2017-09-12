import deepFreeze from 'deep-freeze';
import reducer from './reducer';
import {
  header,
} from './components/SentPosts/postData';

const profileId = '123456';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = {
      byProfileId: {},
    };
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should handle sentPosts_FETCH_START action type', () => {
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          header,
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          posts: [],
          total: 0,
        },
      },
    };
    const action = {
      profileId,
      type: 'sentPosts_FETCH_START',
      args: {
        isFetchingMore: false,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should handle sentPosts_FETCH_SUCCESS action type', () => {
    const post = { id: 'foo', text: 'i love buffer' };
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          header,
          loading: false,
          loadingMore: false,
          moreToLoad: false,
          page: 2,
          posts: [post],
          total: 1,
        },
      },
    };
    const action = {
      profileId,
      type: 'sentPosts_FETCH_SUCCESS',
      result: {
        updates: [post],
        total: 1,
      },
      args: {
        isFetchingMore: false,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should handle sentPosts_FETCH_FAIL action type', () => {
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          header,
          loading: false,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          posts: [],
          total: 0,
        },
      },
    };
    const action = {
      profileId,
      type: 'sentPosts_FETCH_FAIL',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });
});
