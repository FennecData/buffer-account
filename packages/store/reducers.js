import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { reducer as asyncDataFetchReducer } from '@bufferapp/async-data-fetch';
import { reducer as notificationsReducer } from '@bufferapp/notifications';

export default combineReducers({
  form: formReducer,
  router: routerReducer,
  asyncDataFetch: asyncDataFetchReducer,
  notifications: notificationsReducer,
});
