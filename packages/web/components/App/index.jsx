import React from 'react';
import { profilePageRoute } from '@bufferapp/publish-routes';
import { Route, Switch } from 'react-router';
import AppSidebar from '@bufferapp/app-sidebar';
import Notifications from '@bufferapp/notifications';
import ProfilePage from '../ProfilePage';
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
    <AppSidebar activeProduct="publish" />
    <div style={contentStyle}>
      <Switch>
        <Route
          path={profilePageRoute}
          component={ProfilePage}
        />
        <Route component={DefaultPage} />
      </Switch>
    </div>
    <Notifications />
  </div>;
