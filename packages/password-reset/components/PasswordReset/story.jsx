import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import PasswordReset from './index';

storiesOf('PasswordReset')
  .addDecorator(checkA11y)
  .add('default', () => (
    <PasswordReset />
  ));
