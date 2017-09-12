import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  CircleTwitterIcon,
  CircleFacebookIcon,
  CircleInstagramIcon,
  CircleLinkedInIcon,
} from '@bufferapp/components';

const profileBadgeStyle = {
  position: 'relative',
  height: '2rem',
  width: '2rem',
};

const profileBadgeIconStyle = {
  position: 'absolute',
  bottom: '0',
  right: '0',
  height: '1rem',
  width: '1rem',
  display: 'flex',
};

const profileBadgeBackgroundStyle = {
  position: 'absolute',
  bottom: '0.05rem',
  right: '0.05rem',
  background: 'white',
  borderRadius: '50%',
  height: '0.90rem',
  width: '0.90rem',
};

const badgeTypes = PropTypes.oneOf(['twitter', 'facebook', 'instagram', 'linkedin']);

const ProfileBadgeIcon = ({ type }) => {
  switch (type) {
    case 'twitter':
      return <CircleTwitterIcon color={'twitter'} />;
    case 'facebook':
      return <CircleFacebookIcon color={'facebook'} />;
    case 'instagram':
      // TODO: need instagram color
      return <CircleInstagramIcon color={'torchRed'} />;
    case 'linkedin':
      return <CircleLinkedInIcon color={'linkedin'} />;
    default:
      return null;
  }
};

ProfileBadgeIcon.propTypes = {
  type: badgeTypes.isRequired,
};

const ProfileBadge = ({
  avatarUrl,
  type,
}) =>
  <div style={profileBadgeStyle}>
    <Image
      border={'circle'}
      src={avatarUrl}
      height={'100%'}
      width={'100%'}
      verticalAlignBottom
    />
    <div style={profileBadgeBackgroundStyle} />
    <div style={profileBadgeIconStyle}>
      <ProfileBadgeIcon type={type} />
    </div>
  </div>;

ProfileBadge.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  type: badgeTypes.isRequired,
};

export default ProfileBadge;
