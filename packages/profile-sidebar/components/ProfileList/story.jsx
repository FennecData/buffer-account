import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';
import ProfileList from './index';
import profiles from '../../mockData/profiles';

storiesOf('ProfileList')
  .addDecorator(checkA11y)
  .add('should display a list of profiles', () => (
    <ProfileList
      profiles={profiles}
      selectedProfileId={'1234'}
      onProfileClick={action('profile click')}
    />
  ));
