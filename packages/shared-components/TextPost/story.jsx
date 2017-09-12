import React from 'react';
import {
  storiesOf,
  action,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import TextPost from './index';

const links = [{
  rawString: 'http://buff.ly/1LTbUqv',
  displayString: 'http://buff.ly/1LTbUqv',
  url: 'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
  indices: [74, 96],
}];

const text = 'What is a Product Designer? An awesome story by @jgadapee over on Medium! http://buff.ly/1LTbUqv';

const retweetComment = 'Awesome book news here: http://buff.ly/2oZYTnY';

const retweetCommentLinks = [{
  rawString: 'http://buff.ly/2oZYTnY',
  displayString: 'http://buff.ly/2oZYTnY',
  url: 'https://www.theguardian.com/books',
  indices: [24, 46],
}];

const postDetails = {
  isRetweet: false,
  postAction: 'This post will be sent at 9:21 (GMT)',
};

const isARetweetPostDetails = {
  ...postDetails,
  isRetweet: true,
};

const postDetailsError = {
  ...postDetails,
  error: 'Woops something went wrong. Try again?',
};

const retweetProfile = {
  name: 'Joel Gascoigne',
  handle: '@joelgascoigne',
  avatarUrl: 'https://buffer-uploads.s3.amazonaws.com/503a5c8ffc99f72a7f00002e/f49c2ff693f1c307af5e1b3d84e581ca.png',
};

storiesOf('TextPost')
  .addDecorator(checkA11y)
  .add('queued text post', () => (
    <TextPost
      links={links}
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
    <TextPost
      links={links}
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
  .add('retweet', () => (
    <TextPost
      links={links}
      postDetails={isARetweetPostDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      retweetProfile={retweetProfile}
      sent={false}
    />
  ))
  .add('retweet with comment', () => (
    <TextPost
      links={links}
      postDetails={isARetweetPostDetails}
      text={text}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      retweetProfile={retweetProfile}
      retweetComment={retweetComment}
      retweetCommentLinks={retweetCommentLinks}
      sent={false}
    />
  ))
  .add('error', () => (
    <TextPost
      links={links}
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
