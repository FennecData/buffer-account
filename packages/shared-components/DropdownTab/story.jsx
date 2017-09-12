import React from 'react';
import {
  storiesOf,
  action,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import DropdownTab from './index';
import DropdownItem from '../DropdownItem/index';

storiesOf('DropdownTab')
  .addDecorator(checkA11y)
  .add('default', () => (
    <DropdownTab
      title={'Settings'}
      isDropdownShown={false}
    >
      <DropdownItem onClick={action('on-click')}>Posting Schedule</DropdownItem>
      <DropdownItem onClick={action('on-click')}>Empty your Queue</DropdownItem>
      <DropdownItem onClick={action('on-click')}>Disconnect this account</DropdownItem>
    </DropdownTab>
  ))
  .add('dropdown opened', () => (
    <DropdownTab
      title={'Settings'}
      isDropdownShown
    >
      <DropdownItem onClick={action('on-click')}>Posting Schedule</DropdownItem>
      <DropdownItem onClick={action('on-click')}>Empty your Queue</DropdownItem>
      <DropdownItem onClick={action('on-click')}>Disconnect this account</DropdownItem>
    </DropdownTab>
  ));
