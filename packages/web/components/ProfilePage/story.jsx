import React from 'react';
import createStore from '@bufferapp/publish-store';
import {
  ConnectedRouter as Router,
} from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import ProfilePage from './index';

const history = createHistory();
const store = createStore();
// TODO: Use MemoryRouter for testing?
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/MemoryRouter.md
const stubbedHistory = {
  location: {
    pathname: '/profile/1234/tab/queue',
    search: '',
    hash: '',
    state: {} },
};

storiesOf('ProfilePage')
  .addDecorator(checkA11y)
  .addDecorator(getStory =>
    <Provider store={store}>
      <Router history={history}>
        {getStory()}
      </Router>
    </Provider>,
  )
  .add('should render', () => (
    <ProfilePage
      match={{
        params: {
          profileId: 'someProfileId',
          tabId: 'someTabId',
        },
      }}
      history={stubbedHistory}
    />
  ))
  .add('should render settings', () => (
    <ProfilePage
      match={{
        params: {
          profileId: 'someProfileId',
          tabId: 'settings',
        },
      }}
      history={stubbedHistory}
    />
  ));
