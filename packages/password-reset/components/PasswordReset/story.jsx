import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import PasswordReset from './index';

const store = createStore(combineReducers({ form: formReducer }));

storiesOf('PasswordReset')
  .addDecorator(checkA11y)
  .addDecorator(getStory =>
    <Provider store={store}>
      {getStory()}
    </Provider>,
  )
  .add('default', () => (
    <PasswordReset
      onSubmit={action('on-submit-action')} 
      onChange={action('on-change-action')}
    />
  ));
