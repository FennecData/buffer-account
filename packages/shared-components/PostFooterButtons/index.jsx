import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Text,
} from '@bufferapp/components';
import {
  borderWidth,
} from '@bufferapp/components/style/border';
import PostFooterDelete from '../PostFooterDelete';
import HoverableText from '../HoverableText';

const postControlsStyle = {
  display: 'flex',
};

const postButtonEdit = {
  marginLeft: '0.7rem',
};

const verticalLineStyle = {
  marginRight: '0.7rem',
  marginLeft: '0.7rem',
  borderLeft: `${borderWidth} solid transparent`,
};

/* eslint-disable react/prop-types */

const renderEdit = ({
  onEditClick,
}) =>
  (<span style={postButtonEdit}>
    <Button onClick={onEditClick} noStyle>
      <HoverableText
        size={'small'}
        color={'black'}
      >
        Edit
      </HoverableText>
    </Button>
  </span>);

const renderShareNow = ({
  onShareNowClick,
}) =>
  (<span>
    <span style={verticalLineStyle} />
    <Button onClick={onShareNowClick} noStyle>
      <HoverableText
        size={'small'}
        color={'black'}
      >
        Share Now
      </HoverableText>
    </Button>
  </span>);

const renderControls = ({
  isDeleting,
  isConfirmingDelete,
  isWorking,
  onCancelConfirmClick,
  onDeleteClick,
  onEditClick,
  onDeleteConfirmClick,
  onShareNowClick,
}) => {
  if (isDeleting) {
    return (
      <Text size={'small'}> Deleting... </Text>
    );
  }

  if (isWorking) {
    return (
      <Text size={'small'}> Sharing... </Text>
    );
  }

  return (
    <div>
      <PostFooterDelete
        color={'black'}
        isConfirmingDelete={isConfirmingDelete}
        onCancelConfirmClick={onCancelConfirmClick}
        onDeleteConfirmClick={onDeleteConfirmClick}
        onDeleteClick={onDeleteClick}
      />
      {renderEdit({
        onEditClick,
      })}
      {renderShareNow({
        onShareNowClick,
      })}
    </div>
  );
};

/* eslint-enable react/prop-types */

const PostFooterButtons = ({
  isDeleting,
  isConfirmingDelete,
  isWorking,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
}) =>
  (<div style={postControlsStyle}>
    {renderControls({
      isDeleting,
      isConfirmingDelete,
      isWorking,
      onCancelConfirmClick,
      onDeleteClick,
      onEditClick,
      onDeleteConfirmClick,
      onShareNowClick,
    })}
  </div>);

PostFooterButtons.propTypes = {
  isDeleting: PropTypes.bool,
  isConfirmingDelete: PropTypes.bool,
  isWorking: PropTypes.bool,
  onCancelConfirmClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
};

PostFooterButtons.defaultProps = {
  isDeleting: false,
  isConfirmingDelete: false,
  isWorking: false,
};

export default PostFooterButtons;
