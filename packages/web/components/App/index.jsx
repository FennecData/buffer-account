import React from 'react';
import { Route, Switch } from 'react-router';
import Notifications from '@bufferapp/notifications';
import PasswordReset from '@bufferapp/account-password-reset';
import DefaultPage from '../DefaultPage';

const appStyle = {
  display: 'flex',
  height: '100%',
};

const contentStyle = {
  flexGrow: 1,
};

export default () =>
  <div style={appStyle}>
    <div style={contentStyle}>
      <Switch>
        <Route path='/reset-password' component={PasswordReset} />
        <Route component={DefaultPage} />
      </Switch>
    </div>
    <Notifications />
  </div>;
