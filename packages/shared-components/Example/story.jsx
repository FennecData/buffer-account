import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import Example from './index';


storiesOf('Example')
  .addDecorator(checkA11y)
  .add('default', () => (
    <Example />
  ));
