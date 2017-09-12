import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { reducer as loginReducer } from '@bufferapp/login';
import { reducer as asyncDataFetchReducer } from '@bufferapp/async-data-fetch';
import { reducer as notificationsReducer } from '@bufferapp/notifications';

export default combineReducers({
  form: formReducer,
  login: loginReducer,
  router: routerReducer,
  asyncDataFetch: asyncDataFetchReducer,
  notifications: notificationsReducer,
});
