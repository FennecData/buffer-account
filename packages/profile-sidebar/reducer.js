import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import profiles from './mockData/profiles';
import lockedProfiles from './mockData/lockedProfiles';

export const actionTypes = {
  SELECT_PROFILE: 'SELECT_PROFILE',
};

const initialState = {
  profiles,
  lockedProfiles,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      return {
        ...state,
        profiles: action.result
          .filter(profile => !profile.locked),
        lockedProfiles: action.result
          .filter(profile => profile.locked),
      };
    }
    case actionTypes.SELECT_PROFILE: {
      return {
        ...state,
        profiles: state.profiles
          .map(profile => ({
            ...profile,
            open: profile.id === action.profileId,
          })),
      };
    }
    default:
      return state;
  }
};

export const actions = {
  selectProfile: ({ profile }) => ({
    type: actionTypes.SELECT_PROFILE,
    profileId: profile.id,
    profile,
  }),
};
