import React from 'react';
import {
  storiesOf,
  action,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import MultipleImagesPost from './index';

const links = [{
  displayString: 'http://buff.ly/1LTbUqv',
  indices: [74, 96],
  rawString: 'http://buff.ly/1LTbUqv',
  url: 'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
}];

const text = 'What is a Product Designer? An awesome story by @jgadapee over on Medium! http://buff.ly/1LTbUqv';

const postDetails = {
  postAction: 'This post will be sent at 9:21 (GMT)',
};

const postDetailsError = {
  ...postDetails,
  error: 'Sharing failed. Try again?',
};

const imageUrls = [
  'http://lorempixel.com/400/400/cats/',
  'http://lorempixel.com/400/400/cats/',
  'http://lorempixel.com/400/400/cats/',
  'http://lorempixel.com/400/400/cats/',
];

storiesOf('MultipleImagesPost')
  .addDecorator(checkA11y)
  .add('queued multiple image post', () => (
    <MultipleImagesPost
      postDetails={postDetails}
      links={links}
      imageUrls={imageUrls}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      text={text}
      sent={false}
    />
  ))
  .add('sent multiple image post', () => (
    <MultipleImagesPost
      postDetails={postDetails}
      links={links}
      imageUrls={imageUrls}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      text={text}
      sent
    />
  ))
  .add('error', () => (
    <MultipleImagesPost
      postDetails={postDetailsError}
      links={links}
      imageUrls={imageUrls}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      text={text}
      sent={false}
    />
  ));
