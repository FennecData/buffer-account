import { actionTypes as asyncActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = {
  CHECKED_COOKIE: 'CHECKED_COOKIE',
};

const initialState = {
  loggedIn: false,
  loggingIn: false,
  checkedCookie: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECKED_COOKIE:
      return {
        ...state,
        checkedCookie: true,
      };
    case `login_${asyncActionTypes.FETCH_START}`:
      return {
        ...state,
        loggingIn: true,
      };
    case `login_${asyncActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        sessionToken: action.result.token,
        loggedIn: true,
        loggingIn: false,
      };
    case `logout_${asyncActionTypes.FETCH_START}`: {
      const { sessionToken, ...newState } = state;
      return {
        ...newState,
        loggingIn: false,
        loggedIn: false,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  checkedCookie: () => ({
    type: actionTypes.CHECKED_COOKIE,
  }),
};
