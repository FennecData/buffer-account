import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from '@bufferapp/components';
import HoverableText from '../HoverableText';
import colors from '@bufferapp/components/style/color';

const postButtonDeleteStyle = {
  marginLeft: '0.5rem',
};

/* eslint-disable react/prop-types */

const renderConfirmDelete = ({
  color,
  onCancelConfirmClick,
}) =>
  <span style={postButtonDeleteStyle}>
    <Button onClick={onCancelConfirmClick} noStyle>
      <HoverableText
        size={'small'}
        color={color}
      >
        Cancel
      </HoverableText>
    </Button>
  </span>;


const renderDeleteButton = ({
  color,
  isConfirmingDelete,
  onDeleteConfirmClick,
  onDeleteClick,
}) =>
  <span style={postButtonDeleteStyle}>
    <Button onClick={isConfirmingDelete ? onDeleteConfirmClick : onDeleteClick} noStyle>
      <HoverableText
        color={isConfirmingDelete ? 'torchRed' : color}
        size={'small'}
      >
        {isConfirmingDelete ? 'Confirm' : 'Delete'}
      </HoverableText>
    </Button>
  </span>;

/* eslint-enable react/prop-types */

const PostFooterDelete = ({
  color,
  isConfirmingDelete,
  onCancelConfirmClick,
  onDeleteConfirmClick,
  onDeleteClick,
}) =>
  <span>
    {isConfirmingDelete ?
      renderConfirmDelete({ onCancelConfirmClick, color }) :
      undefined
    }
    {renderDeleteButton({
      color,
      isConfirmingDelete,
      onDeleteConfirmClick,
      onDeleteClick,
    })}
  </span>;

PostFooterDelete.propTypes = {
  isConfirmingDelete: PropTypes.bool,
  onCancelConfirmClick: PropTypes.func.isRequired,
  onDeleteConfirmClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  color: PropTypes.oneOf(Object.keys(colors)),
};

PostFooterDelete.defaultProps = {
  isConfirmingDelete: false,
};

export default PostFooterDelete;
