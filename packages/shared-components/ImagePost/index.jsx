import React from 'react';
import PropTypes from 'prop-types';
import {
  IdTag,
  Image,
  LinkifiedText,
} from '@bufferapp/components';
import Post from '../Post';

const postContentStyle = {
  display: 'flex',
};

const postContentTextStyle = {
  paddingRight: '1rem',
  flexGrow: 1,
};

const imageWrapperStyle = {
  position: 'relative',
};

const imageTagStyle = {
  position: 'absolute',
  bottom: '0.7rem',
  left: '0.7rem',
};


const renderTag = (tag) => {
  if (!tag) return;
  return (
    <span style={imageTagStyle}>
      <IdTag>{tag}</IdTag>
    </span>
  );
};

const ImagePost = ({
  isConfirmingDelete,
  isDeleting,
  isWorking,
  imageSrc,
  links,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  postDetails,
  sent,
  text,
  tag,
  retweetProfile,
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
      <div style={imageWrapperStyle}>
        <Image
          src={imageSrc}
          width={'15rem'}
          maxHeight={'20rem'}
          minHeight={'10rem'}
          border={'rounded'}
          objectFit={'cover'}
        />
        { renderTag(tag) }
      </div>

    </div>
  );

  return (
    <Post
      isConfirmingDelete={isConfirmingDelete}
      isDeleting={isDeleting}
      isWorking={isWorking}
      imageSrc={imageSrc}
      links={links}
      onCancelConfirmClick={onCancelConfirmClick}
      onDeleteClick={onDeleteClick}
      onDeleteConfirmClick={onDeleteConfirmClick}
      onEditClick={onEditClick}
      onShareNowClick={onShareNowClick}
      postDetails={postDetails}
      sent={sent}
      text={text}
      retweetProfile={retweetProfile}
    >
      {children}
    </Post>
  );
};

ImagePost.propTypes = {
  ...Post.commonPropTypes,
  imageSrc: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      rawString: PropTypes.string,
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
    }),
  ).isRequired,
  text: PropTypes.string.isRequired,
  tag: PropTypes.string,
};

ImagePost.defaultProps = ImagePost.defaultProps;

export default ImagePost;
