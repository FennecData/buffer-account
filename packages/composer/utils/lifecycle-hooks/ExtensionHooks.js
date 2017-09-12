const ExtensionHooks = {
  handleAppLoaded: ({ isFreeUser, shouldDisplayHelpButton }) => {
    // Let the extension know the composer window is loaded
    if (window.location !== window.parent.location) {
      const message = {
        type: 'buffer_loaded',
        data: {
          userData: {
            shouldDisplayAwesomeCTA: isFreeUser,
            shouldDisplayHelpButton,
          },
        },
      };

      window.parent.postMessage(JSON.stringify(message), '*');
    }
  },

  handleSavedDrafts: () => {
    setTimeout(ExtensionHooks.closeComposer, 3000);
  },

  closeComposer: () => {
    // Send message to the extension to close it
    const message = {
      type: 'buffermessage',
      data: { sent: true },
    };

    window.parent.postMessage(JSON.stringify(message), '*');

    /**
     * The Buffer extension's share dialog is sometimes open in a separate tab.
     * Legacy versions of the Buffer extension were relying on the tab to close itself.
     * Even though new versions of the extension handle the closing of tabs themselves,
     * we still need a window.close() fallback while older versions are still out there.
     */
    if (window.location === window.parent.location) {
      window.close();
    }
  },
};

export default ExtensionHooks;
