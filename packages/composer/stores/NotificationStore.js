import { EventEmitter } from 'events';
import cookies from 'js-cookie';
import AppDispatcher from '../dispatcher';
import { ActionTypes, NotificationTypes, NotificationScopes } from '../AppConstants';
import { generateUniqueId } from '../utils/StringUtils';

const CHANGE_EVENT = 'change';
const CLOSED_NOTIFICATIONS_COOKIE_KEY = 'mc-closed-notifications';

const getInitialState = () => ({
  visibleNotifications: [],
  // A pending queue might prove useful at some point to have finer control over
  // what notifications get displayed, and when (also update queueNotification()
  // and its unique id generation logic if enabling that pending set of notifications)
  // pendingNotifications: [],
});

let state = getInitialState();

const getNewErrorNotification =
  (id, { scope, errorCode, message = '', shouldOnlyCloseOnce = false, data = {} }) =>
  ({
    type: NotificationTypes.ERROR,
    id,
    scope,
    errorCode,
    message,
    shouldOnlyCloseOnce,
    data,
  });

const getNewSuccessNotification =
  (id, { scope, message = '', shouldOnlyCloseOnce = false, data = {} }) =>
  ({
    type: NotificationTypes.SUCCESS,
    id,
    scope,
    message,
    shouldOnlyCloseOnce,
    data,
  });

const getNewInfoNotification =
  (id, { scope, message = '', shouldOnlyCloseOnce = false, data = {} }) =>
  ({
    type: NotificationTypes.INFO,
    id,
    scope,
    message,
    shouldOnlyCloseOnce,
    data,
  });

const NotificationStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: () => NotificationStore.emit(CHANGE_EVENT),
  addChangeListener: (callback) => NotificationStore.on(CHANGE_EVENT, callback),
  removeChangeListener: (callback) => NotificationStore.removeListener(CHANGE_EVENT, callback),

  getVisibleNotifications: () => state.visibleNotifications,
});

const getClosedNotifications = () => cookies.getJSON(CLOSED_NOTIFICATIONS_COOKIE_KEY) || [];
const setClosedNotifications =
  (notifs) => cookies.set(CLOSED_NOTIFICATIONS_COOKIE_KEY, notifs, { expires: 365 * 4 });

const shouldShowNotification = (notification) => {
  if (!notification.shouldOnlyCloseOnce) return true;

  const closedNotifications = getClosedNotifications();
  const wasAlreadyClosed = closedNotifications.includes(notification.scope);

  return !wasAlreadyClosed;
};

const queueNotification = (actionData) => {
  const existingNotificationIds = state.visibleNotifications.map((notif) => notif.id);
  const id = generateUniqueId(existingNotificationIds);
  let notification;

  switch (actionData.type) {
    case NotificationTypes.ERROR:
      notification = getNewErrorNotification(id, actionData);
      break;

    case NotificationTypes.SUCCESS:
      notification = getNewSuccessNotification(id, actionData);
      break;

    case NotificationTypes.INFO:
      notification = getNewInfoNotification(id, actionData);
      break;

    default:
      return;
  }

  if (shouldShowNotification(notification)) state.visibleNotifications.push(notification);
};

const removeNotification = (id) => {
  const removedNotificationIndex = state.visibleNotifications.findIndex((notif) => notif.id === id);
  const removedNotification = state.visibleNotifications[removedNotificationIndex];

  state.visibleNotifications.splice(removedNotificationIndex, 1);

  if (removedNotification.shouldOnlyCloseOnce) {
    const closedNotifications = getClosedNotifications();
    setClosedNotifications([...closedNotifications, removedNotification.scope]);
  }
};

const removeAllNotificiationsByScope = (scope) => {
  const notifications = state.visibleNotifications.filter((notif) =>
    notif.scope === scope
  );
  notifications.forEach((notif) => removeNotification(notif.id));
};

const removeComposerOmniboxNotices = (draftId) => {
  const notifications = state.visibleNotifications.filter((notif) =>
    notif.data.id === draftId &&
    notif.scope === NotificationScopes.MC_OMNIBOX_EDIT_NOTICE
  );
  notifications.forEach((notif) => removeNotification(notif.id));
};

const onDispatchedPayload = (payload) => {
  const action = payload.action;
  let isPayloadInteresting = true;

  switch (action.actionType) {
    case ActionTypes.QUEUE_NOTIFICATION:
      queueNotification(action);
      break;

    case ActionTypes.REMOVE_NOTIFICATION:
      removeNotification(action.id);
      break;

    case ActionTypes.REMOVE_ALL_NOTIFICATIONS_BY_SCOPE:
      removeAllNotificiationsByScope(action.scope);
      break;

    case ActionTypes.REMOVE_COMPOSER_NOTICES:
      removeComposerOmniboxNotices(action.draftId);
      break;

    case ActionTypes.APP_RESET:
      state = getInitialState();
      break;

    default:
      isPayloadInteresting = false;
      break;
  }

  if (isPayloadInteresting) NotificationStore.emitChange();
};

AppDispatcher.register(onDispatchedPayload);

export default NotificationStore;
