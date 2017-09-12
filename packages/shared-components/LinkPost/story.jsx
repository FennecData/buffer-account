import React from 'react';
import {
  storiesOf,
  action,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import LinkPost from './index';

const links = [{
  rawString: 'http://buff.ly/1LTbUqv',
  displayString: 'http://buff.ly/1LTbUqv',
  url: 'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
  indices: [74, 96],
}];

const text = 'What is a Product Designer? An awesome story by @jgadapee over on Medium! http://buff.ly/1LTbUqv';

const linkAttachment = {
  title: 'What is a Product Designer?',
  description: 'A brief history at how history and markets influence design titles',
  url: 'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
  thumbnailUrl: 'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg',
};

const postDetails = {
  postAction: 'This post will be sent at 9:21 (GMT)',
};

const postDetailsError = {
  ...postDetails,
  error: 'Woops something went wrong. Try again?',
};

const squareImage = 'http://lorempixel.com/400/400/cats/';
const tallImage = 'http://lorempixel.com/400/900/cats/';
const wideImage = 'http://lorempixel.com/900/400/cats/';

storiesOf('LinkPost')
  .addDecorator(checkA11y)
  .add('queued link post', () => (
    <LinkPost
      links={links}
      linkAttachment={linkAttachment}
      postDetails={postDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent={false}
    />
  ))
  .add('sent', () => (
    <LinkPost
      links={links}
      linkAttachment={linkAttachment}
      postDetails={postDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent
    />
  ))
  .add('square image', () => (
    <LinkPost
      links={links}
      linkAttachment={{ ...linkAttachment, thumbnailUrl: squareImage }}
      postDetails={postDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent={false}
    />
  ))
  .add('tall image', () => (
    <LinkPost
      links={links}
      linkAttachment={{ ...linkAttachment, thumbnailUrl: tallImage }}
      postDetails={postDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent={false}
    />
  ))
  .add('wide image', () => (
    <LinkPost
      links={links}
      linkAttachment={{ ...linkAttachment, thumbnailUrl: wideImage }}
      postDetails={postDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent={false}
    />
  ))
  .add('error', () => (
    <LinkPost
      links={links}
      linkAttachment={linkAttachment}
      postDetails={postDetailsError}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent={false}
    />
  ));
