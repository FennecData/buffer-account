import React from 'react';
import { storiesOf } from '@storybook/react';
import createStore, { history } from '@bufferapp/accounts-store';
import { Provider } from 'react-redux';
import {
  ConnectedRouter as Router,
} from 'react-router-redux';
import { checkA11y } from 'storybook-addon-a11y';
import App from './index';

storiesOf('App')
  .addDecorator(checkA11y)
  .addDecorator(getStory =>
    <Provider store={createStore()}>
      <Router history={history}>
        {getStory()}
      </Router>
    </Provider>,
  )
  .add('should render application', () => (
    <App />
  ));
