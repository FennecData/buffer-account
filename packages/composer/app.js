/* global buffer */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';
import AppInitActionCreators from './action-creators/AppInitActionCreators';
import { formatInputData, formatUserData, extractPropsFromBufferGlobal }
  from './utils/DataImportUtils';
import { DataImportEnvironments, bufferOriginRegex } from './AppConstants';

/**
 * Use require() instead of import statement to prevent hoisting and
 * make sure window.React is defined before App.jsx is executed. This
 * is necessary because we're importing a React component that uses a React
 * global rather than importing it (shared/views/components/modal/modal)
 */
window.React = React;
const App = require('./components/App');

const containerNode = document.getElementById('multiple-composers');

/**
 * Data imported from other environments (e.g. WEB_DASHBOARD) can be incomplete:
 * for those missing bits, make sure we fill in the blanks with default data, imported
 * from the BOOKMARKLET_PHP env.
 */
const completeHydration = ({
  profilesData, userData, metaData, csrfToken, imageDimensionsKey, options,
}) => {
  const bookmarkletBufferGlobal = buffer;
  const defaultUserData = formatUserData(DataImportEnvironments.BOOKMARKLET_PHP, {
    userData: bookmarkletBufferGlobal.user,
  });

  return {
    userData: Object.assign({}, defaultUserData, userData),
    metaData,
    profilesData,
    csrfToken,
    imageDimensionsKey,
    options,
  };
};

const init = (importedData = {}) => {
  const { profilesData, userData, metaData, csrfToken, imageDimensionsKey, options } =
    completeHydration(importedData);

  ReactDOM.render(
    <App
      profilesData={profilesData}
      userData={userData}
      metaData={metaData}
      csrfToken={csrfToken}
      imageDimensionsKey={imageDimensionsKey}
      options={options}
    />,
    containerNode
  );
};

const reset = () => {
  AppInitActionCreators.resetData();
  ReactDOM.unmountComponentAtNode(containerNode);
};

const onWindowMessage = (e) => {
  const isBufferOrigin = bufferOriginRegex.test(e.origin);
  if (!isBufferOrigin) return;

  if (e.data.type === 'init') {
    const { env, data, options } = e.data;
    const formattedData = formatInputData({ env, data, options });
    init(formattedData);
  }

  if (e.data.type === 'reset') {
    reset();
  }
};

const setup = () => {
  const bufferGlobal = buffer;
  const shouldInitOnLoad = bufferGlobal.meta.application === 'OVERLAY'; // Extension

  if (shouldInitOnLoad) {
    const { userData, metaData, csrfToken, imageDimensionsKey } =
      extractPropsFromBufferGlobal(bufferGlobal);

    const formattedData = formatInputData({
      env: 'BOOKMARKLET_PHP',
      data: {
        profiles: bufferGlobal.user.profiles,
        userData,
        metaData,
        csrfToken,
        imageDimensionsKey,
      },
    });

    init(formattedData);
  }

  window.addEventListener('message', onWindowMessage);
};

setup();
