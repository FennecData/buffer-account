import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { reducer as loginReducer } from '@bufferapp/login';
import { reducer as tabsReducer } from '@bufferapp/publish-tabs';
import { reducer as queueReducer } from '@bufferapp/publish-queue';
import { reducer as sentReducer } from '@bufferapp/publish-sent';
import { reducer as settingsReducer } from '@bufferapp/publish-settings';
import { reducer as i18nReducer } from '@bufferapp/publish-i18n';
import { reducer as profileSidebarReducer } from '@bufferapp/publish-profile-sidebar';
import { reducer as appSidebarReducer } from '@bufferapp/app-sidebar';
import { reducer as asyncDataFetchReducer } from '@bufferapp/async-data-fetch';
import { reducer as notificationsReducer } from '@bufferapp/notifications';

export default combineReducers({
  form: formReducer,
  login: loginReducer,
  router: routerReducer,
  queue: queueReducer,
  sent: sentReducer,
  settings: settingsReducer,
  i18n: i18nReducer,
  tabs: tabsReducer,
  profileSidebar: profileSidebarReducer,
  appSidebar: appSidebarReducer,
  asyncDataFetch: asyncDataFetchReducer,
  notifications: notificationsReducer,
});
