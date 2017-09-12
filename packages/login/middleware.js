import {
  actionTypes as asyncActionTypes,
  actions as asyncActions,
} from '@bufferapp/async-data-fetch';

import Cookie from 'js-cookie';

import { actions } from './index';

const getCookieDomain = () => {
  if (window.location.hostname.indexOf('.local') > -1) {
    return '.local.buffer.com';
  }
  return '.buffer.com';
};

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case 'APP_INIT': {
      // TODO - Remove this duplicate code - this cookie is now
      // loaded in the async data fetch's reducer
      const sessionToken = Cookie.get('session', {
        domain: getCookieDomain(),
      });
      // simulate a succesful login with the token from the cookie
      if (sessionToken) {
        dispatch(asyncActions.fetchSuccess({
          name: 'login',
          args: 'simulated',
          id: 'simulated',
          result: {
            token: sessionToken,
          },
        }));
      }
      dispatch(actions.checkedCookie());
      // TODO: else dispatch a route change to login service
      break;
    }
    case `login_${asyncActionTypes.FETCH_SUCCESS}`:
      Cookie.set('session', action.result.token, {
        domain: getCookieDomain(),
      });
      break;
    case `login_${asyncActionTypes.FETCH_FAIL}`:
    case `logout_${asyncActionTypes.FETCH_START}`:
      if (action.error) {
        console.error(action.error.error); // eslint-disable-line no-console
      }
      console.log('Removing Session Cookie'); // eslint-disable-line no-console
      Cookie.remove('session', {
        domain: getCookieDomain(),
      });
      break;
    default:
      break;
  }
};
