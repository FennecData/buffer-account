import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Text,
} from '@bufferapp/components';
import TextPost from '../TextPost';
import ImagePost from '../ImagePost';
import MultipleImagesPost from '../MultipleImagesPost';
import LinkPost from '../LinkPost';
import VideoPost from '../VideoPost';

const postStyle = {
  marginBottom: '2rem',
};

const listHeaderStyle = {
  marginBottom: '1rem',
  marginTop: '1rem',
  marginLeft: '0.5rem',
};

/* eslint-disable react/prop-types */

const renderPost = ({
  post,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
}) => {
  const postWithEventHandlers = {
    ...post,
    key: post.id,
    onCancelConfirmClick: () => onCancelConfirmClick({ post }),
    onDeleteClick: () => onDeleteClick({ post }),
    onDeleteConfirmClick: () => onDeleteConfirmClick({ post }),
    onEditClick: () => onEditClick({ post }),
    onShareNowClick: () => onShareNowClick({ post }),
  };
  switch (post.type) {
    case 'text':
      return (<TextPost {...postWithEventHandlers} />);
    case 'image':
      return (<ImagePost {...postWithEventHandlers} />);
    case 'multipleImage':
      return (<MultipleImagesPost {...postWithEventHandlers} />);
    case 'link':
      return (<LinkPost {...postWithEventHandlers} />);
    case 'video':
      return (<VideoPost {...postWithEventHandlers} />);
    default:
      return (<TextPost {...postWithEventHandlers} />);
  }
};

/* eslint-enable react/prop-types */

const PostList = ({
  listHeader,
  posts,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
}) =>
  <div>
    <div style={listHeaderStyle}>
      <Text
        color={'black'}
      >
        {listHeader}
      </Text>
    </div>
    <List
      items={posts.map(post =>
        <div style={postStyle}>
          {
            renderPost({
              post,
              onCancelConfirmClick,
              onDeleteClick,
              onDeleteConfirmClick,
              onEditClick,
              onShareNowClick,
            })
          }
        </div>,
      )}
    />
  </div>;

PostList.propTypes = {
  listHeader: PropTypes.string,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    }),
  ),
  onCancelConfirmClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
};

PostList.defaultProps = {
  posts: [],
};

export default PostList;
