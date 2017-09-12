import AppDispatcher from '../dispatcher';
import { ActionTypes, NotificationTypes } from '../AppConstants';

const NotificationActionCreators = {

  queueError: ({ scope, errorCode, message, shouldOnlyCloseOnce, data }) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.QUEUE_NOTIFICATION,
      type: NotificationTypes.ERROR,
      scope,
      errorCode,
      message,
      shouldOnlyCloseOnce,
      data,
    });
  },

  queueSuccess: ({ scope, message, shouldOnlyCloseOnce, data }) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.QUEUE_NOTIFICATION,
      type: NotificationTypes.SUCCESS,
      scope,
      message,
      shouldOnlyCloseOnce,
      data,
    });
  },

  queueInfo: ({ scope, message, shouldOnlyCloseOnce, data }) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.QUEUE_NOTIFICATION,
      type: NotificationTypes.INFO,
      scope,
      message,
      shouldOnlyCloseOnce,
      data,
    });
  },

  removeNotification: (id) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.REMOVE_NOTIFICATION,
      id,
    });
  },

  removeNotificatonsByScope: (scope) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.REMOVE_ALL_NOTIFICATIONS_BY_SCOPE,
      scope,
    });
  },

  removeComposerOmniboxNotices: (draftId) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.REMOVE_COMPOSER_NOTICES,
      draftId,
    });
  },

};

export default NotificationActionCreators;
