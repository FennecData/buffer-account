import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text,
  Divider,
  LoadingAnimation,
} from '@bufferapp/components';

const defaultPageStyle = {
  padding: '1rem',
  textAlign: 'center',
};

const DefaultPage = ({ loggedIn, loggingIn, checkedCookie }) => {
  let message = 'You are not logged in.';
  if (loggingIn) {
    message = 'Please wait...';
  }

  return (
    checkedCookie && <div style={defaultPageStyle}>
      <Text size="large">Welcome to Buffer Publish 🎉</Text>
      <Divider />
      {!loggedIn && <Text>{message}</Text>}
      {loggedIn && <LoadingAnimation />}
    </div>
  );
};

DefaultPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  checkedCookie: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ login }) => login;

export default connect(mapStateToProps)(DefaultPage);
