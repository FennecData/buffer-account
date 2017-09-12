import React from 'react';
import PropTypes from 'prop-types';
import {
  LinkifiedText,
  MultipleImages,
} from '@bufferapp/components';
// import style from './style.css';
import Post from '../Post';

const postContentStyle = {
  display: 'flex',
};

const postContentTextStyle = {
  paddingRight: '1rem',
  flexGrow: 1,
};

const MultipleImagesPost = ({
  postDetails,
  imageUrls,
  isConfirmingDelete,
  isDeleting,
  isWorking,
  links,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  retweetProfile,
  sent,
  text,
}) => {
  const children = (
    <div style={postContentStyle}>
      <span style={postContentTextStyle}>
        <LinkifiedText
          color={'black'}
          links={links}
          size={'mini'}
          newTab
          unstyled
        >
          {text}
        </LinkifiedText>
      </span>
      <div>
        <MultipleImages
          border={'rounded'}
          height={'15rem'}
          urls={imageUrls}
          width={'20rem'}
        />
      </div>
    </div>
  );

  return (
    <Post
      postDetails={postDetails}
      isConfirmingDelete={isConfirmingDelete}
      isDeleting={isDeleting}
      isWorking={isWorking}
      links={links}
      onCancelConfirmClick={onCancelConfirmClick}
      onDeleteClick={onDeleteClick}
      onDeleteConfirmClick={onDeleteConfirmClick}
      onEditClick={onEditClick}
      onShareNowClick={onShareNowClick}
      retweetProfile={retweetProfile}
      sent={sent}
      text={text}
    >
      {children}
    </Post>
  );
};

MultipleImagesPost.propTypes = {
  ...Post.commonPropTypes,
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
      rawString: PropTypes.string,
    }),
  ).isRequired,
  text: PropTypes.string.isRequired,
};

MultipleImagesPost.defaultProps = Post.defaultProps;

export default MultipleImagesPost;
