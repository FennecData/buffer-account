import React from 'react';
import {
  action,
  linkTo,
  storiesOf,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { Text } from '@bufferapp/components';
import Post from './index';

const postDetails = {
  isRetweet: false,
  postAction: 'This post will be sent at 9:21 (GMT)',
};

const postDetailsError = {
  isRetweet: false,
  postAction: 'This post will be sent at 9:21 (GMT)',
  error: 'Sharing failed. Try again?',
};

const isARetweetPostDetails = {
  ...postDetails,
  isRetweet: true,
};

const sentPostDetails = {
  postAction: 'This post was sent June 20th at 9:21 (GMT)',
};

const retweetProfile = {
  avatarUrl: 'https://buffer-uploads.s3.amazonaws.com/503a5c8ffc99f72a7f00002e/f49c2ff693f1c307af5e1b3d84e581ca.png',
  handle: '@joelgascoigne',
  name: 'Joel Gascoigne',
};

const links = [{
  rawString: 'http://buff.ly/1LTbUqv',
  displayString: 'http://buff.ly/1LTbUqv',
  url: 'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
  indices: [74, 96],
}];

const retweetComment = 'What is a Product Designer? An awesome story by @jgadapee over on Medium! http://buff.ly/1LTbUqv';

const children = (
  <Text size={'mini'} color={'black'}>
    {'Rubber baby buggy bumpers.'}
  </Text>
);

storiesOf('Post')
  .addDecorator(checkA11y)
  .add('queued post', () => (
    <Post
      postDetails={postDetails}
      onCancelConfirmClick={linkTo('Post', 'hovered')}
      onDeleteClick={linkTo('Post', 'isConfirmingDelete')}
      onDeleteConfirmClick={linkTo('Post', 'isDeleting')}
      onShareNowClick={linkTo('Post', 'isWorking')}
      onEditClick={action('edit-click')}
      sent={false}
    >
      {children}
    </Post>
  ))
  .add('sent', () => (
    <Post
      postDetails={sentPostDetails}
      onCancelConfirmClick={linkTo('Post', 'hovered')}
      onDeleteClick={linkTo('Post', 'isConfirmingDelete')}
      onDeleteConfirmClick={linkTo('Post', 'isDeleting')}
      onEditClick={action('edit-click')}
      onShareNowClick={linkTo('Post', 'isWorking')}
      sent
    >
      {children}
    </Post>
  ))
  .add('error', () => (
    <Post
      onMouseEnter={action('on-mouse-enter')}
      onMouseLeave={action('on-mouse-leave')}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={linkTo('Post', 'isWorking')}
      postDetails={postDetailsError}
      sent={false}
    >
      {children}
    </Post>
  ))
  .add('isConfirmingDelete', () => (
    <Post
      isConfirmingDelete
      onCancelConfirmClick={linkTo('Post', 'hovered')}
      onDeleteClick={linkTo('Post', 'isConfirmingDelete')}
      onDeleteConfirmClick={linkTo('Post', 'isDeleting')}
      onEditClick={action('edit-click')}
      onShareNowClick={linkTo('Post', 'isWorking')}
      postDetails={postDetails}
      sent={false}
    >
      {children}
    </Post>
  ))
  .add('isDeleting', () => (
    <Post
      isDeleting
      onCancelConfirmClick={linkTo('Post', 'hovered')}
      onDeleteClick={linkTo('Post', 'isConfirmingDelete')}
      onDeleteConfirmClick={linkTo('Post', 'isDeleting')}
      onEditClick={action('edit-click')}
      onShareNowClick={linkTo('Post', 'isWorking')}
      postDetails={postDetails}
      sent={false}
    >
      {children}
    </Post>
  ))
  .add('isWorking', () => (
    <Post
      isWorking
      onCancelConfirmClick={linkTo('Post', 'hovered')}
      onDeleteClick={linkTo('Post', 'isConfirmingDelete')}
      onDeleteConfirmClick={linkTo('Post', 'isDeleting')}
      onEditClick={action('edit-click')}
      onShareNowClick={linkTo('Post', 'isWorking')}
      postDetails={postDetails}
      sent={false}
    >
      {children}
    </Post>
  ))
  .add('retweet', () => (
    <Post
      postDetails={isARetweetPostDetails}
      onMouseEnter={action('mouse-enter')}
      onMouseLeave={action('mous-leave')}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={linkTo('Post', 'isWorking')}
      retweetProfile={retweetProfile}
      sent={false}
    >
      {children}
    </Post>
  ))
  .add('retweet with comment', () => (
    <Post
      postDetails={isARetweetPostDetails}
      retweetCommentLinks={links}
      onMouseEnter={action('mouse-enter')}
      onMouseLeave={action('mous-leave')}
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={linkTo('Post', 'isWorking')}
      retweetProfile={retweetProfile}
      retweetComment={retweetComment}
      sent={false}
    >
      {children}
    </Post>
  ));
