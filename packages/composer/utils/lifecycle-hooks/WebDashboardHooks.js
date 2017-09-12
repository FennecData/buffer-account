/* global window */

import AppStore from '../../stores/AppStore';
import { bufferOrigins } from '../../AppConstants';

const WebDashboardHooks = {

  handleBackdropClicked: () => {
    const { environment } = AppStore.getMetaData();

    window.parent.postMessage({
      type: 'backdrop-click',
    }, bufferOrigins.get(environment));
  },

  handleSavedDrafts: () => {
    const onNewPublish = AppStore.getUserData();
    if (onNewPublish) {
      AppStore.getOptions().onSave();
      return;
    }
    const { environment } = AppStore.getMetaData();

    window.parent.postMessage({
      type: 'drafts-saved',
    }, bufferOrigins.get(environment));
  },

};

export default WebDashboardHooks;
