import React from 'react';
import PropTypes from 'prop-types';
import {
  PostLists,
  EmptyState,
} from '@bufferapp/publish-shared-components';
import {
  Divider,
  Text,
  LoadingAnimation,
} from '@bufferapp/components';
import {
  geyser,
  fillColor,
  curiousBlue,
} from '@bufferapp/components/style/color';

const headerStyle = {
  marginBottom: '1.5rem',
  width: '100%',
};

const loadingContainerStyle = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  paddingTop: '5rem',
};

const SentPosts = ({
  header,
  total,
  loading,
  loadingMore,
  postLists,
}) => {
  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <LoadingAnimation />
      </div>
    );
  }
  if (total < 1) {
    return (
      <EmptyState
        title="You haven’t published any posts with this account in the past 30 days!"
        subtitle="Once a post has gone live via Buffer, you can track it’s performance here to learn what works best with your audience!"
        heroImg="https://s3.amazonaws.com/buffer-publish/images/empty-sent2x.png"
        heroImgSize={{ width: '270px', height: '150px' }}
      />
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
      <div style={headerStyle}>
        <Text color={'black'}>{header}</Text>
        <Divider />
      </div>
      <PostLists
        postLists={postLists}
      />
      <div style={loadMoreStyle}><Text>Loading&hellip;</Text></div>
    </div>
  );
};

SentPosts.propTypes = {
  header: PropTypes.string,
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
  ),
  total: PropTypes.number,
};

SentPosts.defaultProps = {
  header: null,
  loading: true,
  loadingMore: false,
  moreToLoad: false,
  page: 1,
  postLists: [],
  total: 0,
};

export default SentPosts;
