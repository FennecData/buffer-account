import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import SettingsTooltip from './index';

storiesOf('SettingsTooltip')
  .addDecorator(checkA11y)
  .add('default', () => (
    <SettingsTooltip />
  ));
