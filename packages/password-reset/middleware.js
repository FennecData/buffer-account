import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.CHANGE_PASSWORD:
      dispatch(dataFetchActions.fetch({
        name: 'passwordReset',
        args: {
          password: action.currentPassword,
          newPassword: action.newPassword,
        },
      }));
      break;
    default:
      break;
  }
};
