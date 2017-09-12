import React from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
} from '@bufferapp/publish-shared-components';

const TabNavigation = ({
  selectedTabId,
  onTabClick,
}) =>
  /* wrapper div with "tabs" id necessary as a selector
  for a11y focus after selecting profile in sidebar */
  <div id="tabs">
    <Tabs
      selectedTabId={selectedTabId}
      onTabClick={onTabClick}
    >
      <Tab tabId={'queue'}>Queue</Tab>
      <Tab tabId={'sent'}>Sent Posts</Tab>
      <Tab tabId={'settings'}>Settings</Tab>
    </Tabs>
  </div>;

TabNavigation.propTypes = {
  selectedTabId: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

export default TabNavigation;
