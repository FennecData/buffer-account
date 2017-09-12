import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case `login_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(dataFetchActions.fetch({
        name: 'user',
      }));
      break;
    default:
      break;
  }
};
