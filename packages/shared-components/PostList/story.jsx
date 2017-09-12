import React from 'react';
import {
  storiesOf,
  action,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import PostList from './index';
import {
  posts,
  linkPosts,
  missingTypePosts,
  imagePosts,
  multipleImagePosts,
  sentPosts,
  videoPosts,
  listHeader,
} from './postData';

storiesOf('PostList')
  .addDecorator(checkA11y)
  .add('default', () => (
    <PostList
      listHeader={listHeader}
      posts={posts}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
    />
  ))
  .add('sent', () => (
    <PostList
      listHeader={listHeader}
      posts={sentPosts}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
    />
  ))
  .add('missing type', () => (
    <PostList
      listHeader={listHeader}
      posts={missingTypePosts}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
    />
  ))
  .add('link posts', () => (
    <PostList
      listHeader={listHeader}
      posts={linkPosts}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
    />
  ))
  .add('image posts', () => (
    <PostList
      listHeader={listHeader}
      posts={imagePosts}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
    />
  ))
  .add('multiple image posts', () => (
    <PostList
      listHeader={listHeader}
      posts={multipleImagePosts}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
    />
  ))
  .add('video posts', () => (
    <PostList
      listHeader={listHeader}
      posts={videoPosts}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
    />
  ));
