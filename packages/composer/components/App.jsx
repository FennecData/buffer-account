import React from 'react';
import ReactTooltip from 'react-tooltip';
import DragMe from '@bufferapp/dragme';
import AppStore from '../stores/AppStore';
import ComposerStore from '../stores/ComposerStore';
import NotificationStore from '../stores/NotificationStore';
import { AppEnvironments, NotificationScopes, Services, ErrorTypes, SaveButtonTypes }
  from '../AppConstants';
import AppActionCreators from '../action-creators/AppActionCreators';
import AppInitActionCreators from '../action-creators/AppInitActionCreators';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import WebSocket from '../utils/WebSocket';
import ComposerSection from '../components/ComposerSection';
import UpdateSaver from '../components/UpdateSaver';
import ProfileSection from '../components/ProfileSection';
import CloseButton from '../components/CloseButton';
import NotificationContainer from '../components/NotificationContainer';
import PowerSchedulerButton from '../components/PowerSchedulerButton';
import Modals from '../components/Modals';
import { observeStore } from '../utils/StoreUtils';
import AppHooks from '../utils/lifecycle-hooks';

// App-level styles
// import '../../../../../node_modules/normalize.css/normalize.css';
import styles from './css/App.css';

function getState() {
  const scheduledAt = ComposerStore.getScheduledAt();

  return {
    profiles: AppStore.getProfiles(),
    appState: AppStore.getAppState(),
    metaData: AppStore.getMetaData(),
    userData: AppStore.getUserData(),
    scheduledAt,
    availableSchedulesSlotsForDay: AppStore.getAvailableSchedulesSlotsForDay(scheduledAt),
    isPinnedToSlot: ComposerStore.isPinnedToSlot(),
    visibleNotifications: NotificationStore.getVisibleNotifications(),
  };
}

class App extends React.Component {
  static propTypes = {
    profilesData: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      serviceName: React.PropTypes.string.isRequired,
      serviceUsername: React.PropTypes.string.isRequired,
      serviceFormattedUsername: React.PropTypes.string.isRequired,
      imagesAvatar: React.PropTypes.string.isRequired,
      timezone: React.PropTypes.string.isRequired,
      shouldBeAutoSelected: React.PropTypes.bool.isRequired,
      isDisabled: React.PropTypes.bool.isRequired,
      serviceType: React.PropTypes.string.isRequired,
      isBusinessProfile: React.PropTypes.bool.isRequired,
      subprofiles: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        profileId: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        avatar: React.PropTypes.string.isRequired,
        isShared: React.PropTypes.bool.isRequired,
        shouldBeAutoSelected: React.PropTypes.bool.isRequired,
      })).isRequired,
    })).isRequired,

    userData: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      s3UploadSignature: React.PropTypes.shape({
        algorithm: React.PropTypes.string.isRequired,
        base64Policy: React.PropTypes.string.isRequired,
        bucket: React.PropTypes.string.isRequired,
        credentials: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        expires: React.PropTypes.string.isRequired,
        signature: React.PropTypes.string.isRequired,
        successActionStatus: React.PropTypes.string.isRequired,
      }).isRequired,
      uses24hTime: React.PropTypes.bool.isRequired,
      weekStartsMonday: React.PropTypes.bool.isRequired,
      isFreeUser: React.PropTypes.bool.isRequired,
      isBusinessUser: React.PropTypes.bool.isRequired,
      shouldAlwaysSkipEmptyTextAlert: React.PropTypes.bool.isRequired,
      profileGroups: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        profileIds: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired,
      })).isRequired,
      profilesSchedulesSlots: React.PropTypes.objectOf(
        React.PropTypes.objectOf(
          React.PropTypes.arrayOf(React.PropTypes.shape({
            isSlotFree: React.PropTypes.bool.isRequired,
            timestamp: React.PropTypes.number.isRequired,
          }))
        )
      ),
    }).isRequired,

    metaData: React.PropTypes.shape({
      environment: React.PropTypes.string.isRequired,
      appEnvironment: React.PropTypes.string.isRequired,
      shouldDisplayHelpButton: React.PropTypes.bool.isRequired,
      shouldEnableFacebookAutocomplete: React.PropTypes.bool.isRequired,
      shouldUseNewTwitterAutocomplete: React.PropTypes.bool.isRequired,
      showTwitterImageDescription: React.PropTypes.bool.isRequired,
      updateId: React.PropTypes.string,
      scheduledAt: React.PropTypes.number,
      isPinnedToSlot: React.PropTypes.bool,
      didUserSetScheduledAt: React.PropTypes.bool,
      text: React.PropTypes.string,
      url: React.PropTypes.string,
      sourceUrl: React.PropTypes.string,
      via: React.PropTypes.string,
      images: React.PropTypes.arrayOf(React.PropTypes.string),
      video: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        duration: React.PropTypes.number.isRequired,
        durationMs: React.PropTypes.number.isRequired,
        size: React.PropTypes.number.isRequired,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired,
        originalUrl: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired,
        availableThumbnails: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
      }),
      browser: React.PropTypes.string,
      extensionVersion: React.PropTypes.string,
      retweetData: React.PropTypes.shape({
        text: React.PropTypes.string.isRequired,
        tweetId: React.PropTypes.string.isRequired,
        userId: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.number,
        ]).isRequired,
        userName: React.PropTypes.string.isRequired,
        userDisplayName: React.PropTypes.string.isRequired,
        tweetUrl: React.PropTypes.string.isRequired,
        avatarUrl: React.PropTypes.string.isRequired,
        comment: React.PropTypes.string.isRequired,
      }),
      facebookMentionEntities: React.PropTypes.arrayOf(React.PropTypes.shape({
        indices: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
      })),
    }).isRequired,

    csrfToken: React.PropTypes.string.isRequired,
    imageDimensionsKey: React.PropTypes.string.isRequired,
    accessToken: React.PropTypes.string.isRequired,
    onNewPublish: React.PropTypes.bool,

    options: React.PropTypes.shape({
      canSelectProfiles: React.PropTypes.bool.isRequired,
      saveButtons: React.PropTypes.arrayOf(
        React.PropTypes.oneOf(Object.keys(SaveButtonTypes))
      ).isRequired,
      updateId: React.PropTypes.string,
      position: React.PropTypes.shape({
        top: React.PropTypes.number.isRequired,
        left: React.PropTypes.number,
      }),
      onSave: React.PropTypes.func,
    }).isRequired,
  };

  static defaultProps = {
    userData: {
      profileSchedulesSlots: undefined,
      onNewPublish: false,
    },
    options: {
      onSave: () => {},
    },
  };

  constructor(props) {
    super(props);

    this.state = getState();
    this.isInitialized = false; // Ensure we load initial data and open web socket only once
  }

  componentWillMount() {
    AppStore.addChangeListener(this.onStoreChange);
    NotificationStore.addChangeListener(this.onStoreChange);
    /* prevent drop/dragover behavior when dropping a file not in the dropzone*/
    window.addEventListener('drop', (e) => e.preventDefault());
    window.addEventListener('dragover', (e) => e.preventDefault());

    if (!this.isInitialized) this.init();

    AppActionCreators.trackUserAction(['viewed'], {
      timeToRender: (new Date() - window.pageStartTime),
    });

    window.addEventListener('click', this.onDocumentClick);
  }

  componentDidMount() {
    observeStore(AppStore, (store) => store.getAppState().isLoaded)
      .then(() => {
        if (this.state.metaData.appEnvironment === AppEnvironments.EXTENSION) {
          this.dragMe = new DragMe(document.querySelector('.js-enable-dragging'), {
            cancel: '.js-disable-dragging',
            onDragStart: (target) => {
              AppActionCreators.trackUserAction(['composer', 'dragged'], {
                draggingTarget: (target === this.draggingAnchor) ? 'dragging-anchor' : 'app-window',
              });
            },
          });
        }
      });
  }

  componentDidUpdate() {
    setTimeout(() => {
      ReactTooltip.rebuild();
    }, 100);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this.onStoreChange);
    NotificationStore.removeChangeListener(this.onStoreChange);
    window.removeEventListener('drop', (e) => e.preventDefault());
    window.removeEventListener('dragover', (e) => e.preventDefault());
    window.removeEventListener('click', this.onDocumentClick);

    if (this.dragMe) this.dragMe.cleanup();
  }

  onDocumentClick = (ev) => {
    // on document click, if not from MC, execute callback from options
    if (!this.appElement.contains(ev.target)) {
      AppStore.getOptions().onSave();
    }
  }

  onStoreChange = () => this.setState(getState());

  onAppWrapperClick = (e) => {
    const isBackdropClicked = e.target === e.currentTarget;
    if (isBackdropClicked) AppHooks.handleBackdropClicked();
  };

  onAppClick = (e) => {
    const { expandedComposerId } = this.state.appState;
    const isComposerExpanded = expandedComposerId !== null;

    if (!isComposerExpanded || e.defaultPrevented) return;

    // If users mousedown inside the editor, select some text and then mouseup
    // outside the editor, this action will also trigger a click, which would
    // collapse the composer. We double-check a click doesn't follow the action
    // of selecting text before collapsing the composer.
    const isClickFollowingSelection = getSelection().toString().length > 0;
    if (isClickFollowingSelection) return;

    ComposerActionCreators.collapse(expandedComposerId);
  };

  onCloseButtonClick = () => AppActionCreators.closeComposer();

  init = () => {
    const {
      profilesData,
      userData,
      metaData,
      csrfToken,
      imageDimensionsKey,
      options,
      accessToken,
      onNewPublish,
    } = this.props;

    AppInitActionCreators.loadInitialData({
      profilesData,
      userData,
      metaData,
      csrfToken,
      imageDimensionsKey,
      options,
      accessToken,
      onNewPublish,
    });
    WebSocket.init();

    this.isInitialized = true;
  };

  render() {
    if (!this.state.appState.isLoaded) return null;

    const { availableSchedulesSlotsForDay, metaData, isPinnedToSlot } = this.state;

    const {
      appEnvironment, showTwitterImageDescription, shouldEnableFacebookAutocomplete,
    } = metaData;

    const { canSelectProfiles, saveButtons, position = null } = this.props.options;

    const selectedProfiles = this.state.profiles.filter((profile) => profile.isSelected);
    const firstSelectedProfile = selectedProfiles[0];
    const firstSelectedProfileTimezone =
      firstSelectedProfile ? firstSelectedProfile.timezone : null;
    const isSlotPickingAvailable = selectedProfiles.length === 1;
    const moreThanOneProfileSelected = selectedProfiles.length > 1;
    const shouldShowInlineSubprofileDropdown = !canSelectProfiles && selectedProfiles.length === 1;

    const appDynamicStyle = {};

    if (position !== null) {
      const shouldOverrideVerticalPositioningOnly = typeof position.left === 'undefined';

      if (shouldOverrideVerticalPositioningOnly) {
        appDynamicStyle.margin = '0 auto';
        appDynamicStyle.top = `${position.top}px`;
      } else {
        appDynamicStyle.position = 'absolute';
        appDynamicStyle.margin = 0;
        appDynamicStyle.top = `${position.top}px`;
        appDynamicStyle.left = `${position.left}px`;
      }
    }

    const topLevelNotificationContainerExcludedScopes = [
      NotificationScopes.BOARD_CREATION,
      NotificationScopes.MC_OMNIBOX_EDIT_NOTICE,
      NotificationScopes.UPDATE_SAVING_AGGREGATE,
      ...Services.map((service) => `${NotificationScopes.UPDATE_SAVING}-${service.name}`),
      ...Services.map((service) => (
        `${NotificationScopes.UPDATE_SAVING}-${ErrorTypes.INLINE}-${service.name}`
      )),
      ...Services.map((service) => (
        `${NotificationScopes.COMPOSER_NOTICE_NOT_PREFILLED}-${service.name}`
      )),
    ];

    const notificationsContainerClassNames = {
      container: styles.floatingNotificationsContainer,
      notification: styles.floatingNotification,
    };

    const appClassName = [
      styles.app,
      'js-enable-dragging',
    ].join(' ');

    const draggingAnchorClassName = [
      'bi bi-drag',
      styles.draggingAnchor,
    ].join(' ');

    const closeButtonClassName = [
      'bi bi-x',
      styles.closeButton,
    ].join(' ');

    const areAllDraftsSaved = ComposerStore.areAllDraftsSaved();
    const isOmniboxEnabled = this.state.appState.isOmniboxEnabled;
    const showPowerSchedulerButton =
      this.state.metaData.appEnvironment === AppEnvironments.EXTENSION;

    return (
      <div
        ref={(elem) => { this.appElement = elem; }}
        className={styles.appWrapper}
        onClick={this.onAppWrapperClick}
      >
        <Modals />

        {showPowerSchedulerButton &&
          <PowerSchedulerButton
            selectedProfiles={selectedProfiles}
            visibleNotifications={this.state.visibleNotifications}
          />}

        <NotificationContainer
          visibleNotifications={this.state.visibleNotifications}
          classNames={notificationsContainerClassNames}
          notScopes={topLevelNotificationContainerExcludedScopes}
          shouldShowCloseIcon
        />

        <div className={appClassName} style={appDynamicStyle} onClick={this.onAppClick}>

          {appEnvironment === AppEnvironments.EXTENSION &&
            <span className={draggingAnchorClassName} ref={(ref) => (this.draggingAnchor = ref)} />}

          {appEnvironment === AppEnvironments.EXTENSION &&
            <CloseButton className={closeButtonClassName} onClick={this.onCloseButtonClick} />}

          {canSelectProfiles &&
            <ProfileSection
              appState={this.state.appState}
              profiles={this.state.profiles}
              userData={this.state.userData}
              visibleNotifications={this.state.visibleNotifications}
            />}

          <ComposerSection
            isOmniboxEnabled={isOmniboxEnabled}
            appState={this.state.appState}
            profiles={this.state.profiles}
            shouldShowInlineSubprofileDropdown={shouldShowInlineSubprofileDropdown}
            visibleNotifications={this.state.visibleNotifications}
            areAllDraftsSaved={areAllDraftsSaved}
            selectedProfiles={selectedProfiles}
            shouldEnableFacebookAutocomplete={shouldEnableFacebookAutocomplete}
            showTwitterImageDescription={showTwitterImageDescription}
            composerPosition={position}
          />

          <UpdateSaver
            appState={this.state.appState}
            metaData={this.state.metaData}
            userData={this.state.userData}
            timezone={firstSelectedProfileTimezone}
            saveButtons={saveButtons}
            scheduledAt={this.state.scheduledAt}
            isSlotPickingAvailable={isSlotPickingAvailable}
            isPinnedToSlot={isPinnedToSlot}
            availableSchedulesSlotsForDay={availableSchedulesSlotsForDay}
            visibleNotifications={this.state.visibleNotifications}
            moreThanOneProfileSelected={moreThanOneProfileSelected}
            areAllDraftsSaved={areAllDraftsSaved}
            whatPreventsSavingMessages={this.state.appState.whatPreventsSaving}
            isOmniboxEnabled={isOmniboxEnabled}
          />
          <ReactTooltip class={styles.tooltip} effect="solid" place="top" />
        </div>
      </div>
    );
  }
}

export default App;
