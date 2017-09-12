import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import SentPosts from './index';
import {
  header,
  postLists,
} from './postData';

storiesOf('SentPosts')
  .addDecorator(checkA11y)
  .add('default', () => (
    <SentPosts
      total={0}
      header={header}
      postLists={postLists}
    />
  ));
