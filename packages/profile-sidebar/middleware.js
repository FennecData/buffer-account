import { push } from 'react-router-redux';
import {
  generateProfilePageRoute,
  getProfilePageParams,
} from '@bufferapp/publish-routes';
import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import {
  actions,
} from './reducer';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case `login_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(dataFetchActions.fetch({
        name: 'profiles',
      }));
      break;
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const params = getProfilePageParams({
        path: getState().router.location.pathname,
      });
      if (params && params.profileId) {
        dispatch(actions.selectProfile({
          profile: action.result.find(profile => profile.id === params.profileId),
        }));
      } else if (action.result.length > 0) {
        const selectedProfile = action.result[0];
        dispatch(actions.selectProfile({
          profile: selectedProfile,
        }));
        dispatch(push(generateProfilePageRoute({
          profileId: selectedProfile.id,
          tabId: 'queue',
        })));
      }
      break;
    }
    default:
      break;
  }
};
