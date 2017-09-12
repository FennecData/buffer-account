import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';
import InputAutocomplete from './index';
import { getStates, sortStates } from './utils';

storiesOf('InputAutocomplete')
  .addDecorator(checkA11y)
  .add('default', () => (
    <InputAutocomplete
      input={{
        onChange: action('on-change'),
        value: '',
      }}
      items={getStates()}
      onSelect={action('select-item')}
      sortItems={sortStates}
    />
  ));
