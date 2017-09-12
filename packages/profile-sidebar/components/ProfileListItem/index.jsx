import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  LockIcon,
  Link,
} from '@bufferapp/components';
import {
  calculateStyles,
} from '@bufferapp/components/lib/utils';
import {
  curiousBlueUltraLight,
} from '@bufferapp/components/style/color';
import {
  borderRadius,
} from '@bufferapp/components/style/border';
import ProfileBadge from '../ProfileBadge';

const profileBadgeWrapperStyle = {
  marginRight: '1rem',
};

const notificationsStyle = {
  flexGrow: 1,
  textAlign: 'right',
};

const Notifications = ({
  notifications,
}) =>
  <Text size="mini">{notifications}</Text>;

Notifications.propTypes = {
  notifications: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Notifications.defaultProps = {
  notifications: null,
};

const ProfileSidebar = ({
  avatarUrl,
  type,
  notifications,
  handle,
  locked,
  selected,
  onClick,
}) => {
  const handleClick = () => {
    onClick();
    /* move focus to tabs after selecting profile */
    const queueTab = document.querySelector('#tabs a');
    if (queueTab) queueTab.focus();
  };
  return (
    <Link
      href={'#'}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      unstyled
    >
      <div
        style={calculateStyles({
          default: {
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem',
            opacity: 0.6,
          },
          selected: {
            background: curiousBlueUltraLight,
            opacity: 1,
            borderRadius,
          },
        }, {
          selected,
        })}
      >
        <div style={profileBadgeWrapperStyle}>
          <ProfileBadge
            avatarUrl={avatarUrl}
            type={type}
          />
        </div>
        <Text
          size={'small'}
          color={selected ? 'black' : 'shuttleGray'}
        >
          {handle}
        </Text>
        <div style={notificationsStyle}>
          { locked ? <LockIcon /> : <Notifications notifications={notifications} />}
        </div>
      </div>
    </Link>
  );
};

ProfileSidebar.propTypes = {
  ...Notifications.propTypes,
  ...ProfileBadge.propTypes,
  handle: PropTypes.string.isRequired,
  locked: PropTypes.bool,
  selected: PropTypes.bool,
};

ProfileSidebar.defaultProps = {
  locked: false,
  selected: false,
};

export default ProfileSidebar;
