import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import AppSidebar from './index';

const translations = {};
const fakeUser = {
  loading: false,
  id: '1234',
  name: 'Hamish Macpherson',
  email: 'hamstu@gmail.com',
  avatar: '',
};

storiesOf('AppSidebar')
  .addDecorator(checkA11y)
  .add('should show app sidebar', () => (
    <div style={{ width: '65px', height: '100%', display: 'flex' }}>
      <AppSidebar
        activeProduct="publish"
        translations={translations}
        user={fakeUser}
      />
    </div>
  ));
