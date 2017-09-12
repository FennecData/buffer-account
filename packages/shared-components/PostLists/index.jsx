import {
  List,
} from '@bufferapp/components';

import React from 'react';
import PropTypes from 'prop-types';
import PostList from '../PostList';

/* eslint-disable react/prop-types */

const postListStyle = {
  marginBottom: '2.5rem',
};

const renderPostList = ({
  index,
  postList,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
}) =>
  <div style={postListStyle}>
    <PostList
      key={`postList-${index}`}
      listHeader={postList.listHeader}
      posts={postList.posts}
      onCancelConfirmClick={onCancelConfirmClick}
      onDeleteClick={onDeleteClick}
      onDeleteConfirmClick={onDeleteConfirmClick}
      onEditClick={onEditClick}
      onShareNowClick={onShareNowClick}
    />
  </div>;

/* eslint-enable react/prop-types */

const PostLists = ({
  postLists,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
}) =>
  <List
    items={postLists.map((postList, index) =>
      renderPostList({
        index,
        postList,
        onCancelConfirmClick,
        onDeleteClick,
        onDeleteConfirmClick,
        onEditClick,
        onShareNowClick,
      }),
    )}
    fillContainer
  />;

PostLists.propTypes = {
  postLists: PropTypes.arrayOf(
    PropTypes.shape({
      listHeader: PropTypes.string,
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  onCancelConfirmClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
};

PostLists.defaultProps = {
  postLists: [],
};

export default PostLists;
