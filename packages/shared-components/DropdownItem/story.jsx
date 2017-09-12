import React from 'react';
import {
  action,
  storiesOf,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import DropdownItem from './index';

storiesOf('DropdownItem')
  .addDecorator(checkA11y)
  .add('default', () => (
    <DropdownItem onClick={action('on-click')}>Posting Schedule</DropdownItem>
  ));
