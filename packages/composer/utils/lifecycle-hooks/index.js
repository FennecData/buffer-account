import AppStore from '../../stores/AppStore';
import { AppEnvironments } from '../../AppConstants';
import ExtensionHooks from './ExtensionHooks';
import WebDashboardHooks from './WebDashboardHooks';

const AppHooks = {
  handleAppLoaded: () => {
    const { appEnvironment, shouldDisplayHelpButton } = AppStore.getMetaData();
    const { isFreeUser } = AppStore.getUserData();

    if (appEnvironment === AppEnvironments.EXTENSION) {
      ExtensionHooks.handleAppLoaded({ isFreeUser, shouldDisplayHelpButton });
    }
  },

  handleSavedDrafts: () => {
    const { appEnvironment } = AppStore.getMetaData();
    if (appEnvironment === AppEnvironments.EXTENSION) ExtensionHooks.handleSavedDrafts();
    if (appEnvironment === AppEnvironments.WEB_DASHBOARD) WebDashboardHooks.handleSavedDrafts();
  },

  handleBackdropClicked: () => {
    const { appEnvironment } = AppStore.getMetaData();
    if (appEnvironment === AppEnvironments.WEB_DASHBOARD) WebDashboardHooks.handleBackdropClicked();
  },

  closeComposer: () => {
    const { appEnvironment } = AppStore.getMetaData();
    if (appEnvironment === AppEnvironments.EXTENSION) ExtensionHooks.closeComposer();
  },
};

export default AppHooks;
