import React from 'react';
import PropTypes from 'prop-types';

import { geyser } from '@bufferapp/components/style/color';
import {
  AvatarIcon,
} from '@bufferapp/components';

const UserAvatar = ({ avatar, color, size }) => {
  const style = {
    height: size.height,
    width: size.width,
    position: 'relative',
  };
  const avatarImageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: size.height,
    width: size.width,
    backgroundImage: `url(${avatar})`,
    backgroundSize: 'cover',
    zIndex: 10,
    borderRadius: '100%',
    overflow: 'hidden',
  };
  const fallbackAvatarStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
  };
  return (
    <div style={style}>
      <div style={avatarImageStyle} />
      <div style={fallbackAvatarStyle}>
        <AvatarIcon color={color} size={size} />
      </div>
    </div>
  );
};

UserAvatar.propTypes = {
  avatar: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.shape({
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  }),
};

UserAvatar.defaultProps = {
  color: geyser,
  size: {
    width: '27px',
    height: '27px',
  },
};

export default UserAvatar;
