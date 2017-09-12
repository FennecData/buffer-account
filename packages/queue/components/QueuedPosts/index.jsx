import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Input,
  LoadingAnimation,
} from '@bufferapp/components';
import {
  geyser,
  fillColor,
  curiousBlue,
} from '@bufferapp/components/style/color';
import {
  PostLists,
  EmptyState,
} from '@bufferapp/publish-shared-components';
import ComposerWrapper from '../ComposerWrapper';

const composerStyle = {
  marginBottom: '1.5rem',
};

const loadingContainerStyle = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  paddingTop: '5rem',
};

const QueuedPosts = ({
  total,
  loading,
  loadingMore,
  postLists,
  onComposerPlaceholderClick,
  onComposerCreateSuccess,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  showComposer,
}) => {
  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <LoadingAnimation />
      </div>
    );
  }
  const loadMoreStyle = {
    border: `1px solid ${geyser}`,
    width: '100%',
    padding: '1rem',
    margin: '0 0 2rem 0',
    position: 'relative',
    textAlign: 'center',
    backgroundColor: fillColor,
    color: curiousBlue,
    opacity: loadingMore ? '1' : '0',
    boxSizing: 'border-box',
  };

  return (
    <div>
      <div style={composerStyle}>
        {showComposer ?
          <ComposerWrapper
            onSave={onComposerCreateSuccess}
          />
          :
          <Input
            placeholder={'What would you like to share?'}
            onFocus={onComposerPlaceholderClick}
          />
        }
      </div>
      {total < 1 &&
        <EmptyState
          title="It looks like you haven't got any posts in your queue!"
          subtitle="Click the box above to add a post to your queue :)"
          heroImg="https://s3.amazonaws.com/buffer-publish/images/fresh-queue%402x.png"
          heroImgSize={{ width: '229px', height: '196px' }}
        />
      }
      <PostLists
        postLists={postLists}
        onCancelConfirmClick={onCancelConfirmClick}
        onDeleteClick={onDeleteClick}
        onDeleteConfirmClick={onDeleteConfirmClick}
        onEditClick={onEditClick}
        onShareNowClick={onShareNowClick}
      />
      <div style={loadMoreStyle}><Text>Loading&hellip;</Text></div>
    </div>
  );
};

QueuedPosts.propTypes = {
  loading: PropTypes.bool,
  loadingMore: PropTypes.bool,
  moreToLoad: PropTypes.bool, // eslint-disable-line
  page: PropTypes.number, // eslint-disable-line
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
  total: PropTypes.number,
  onComposerPlaceholderClick: PropTypes.func.isRequired,
  onComposerCreateSuccess: PropTypes.func.isRequired,
  onCancelConfirmClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onDeleteConfirmClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onShareNowClick: PropTypes.func.isRequired,
  showComposer: PropTypes.bool,
};

QueuedPosts.defaultProps = {
  loading: true,
  loadingMore: false,
  moreToLoad: false,
  page: 1,
  postLists: [],
  showComposer: false,
  total: 0,
  enabledApplicationModes: [],
};

export default QueuedPosts;
