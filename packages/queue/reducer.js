import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar';

export const actionTypes = {
  POST_CREATED: 'POST_CREATED',
  POST_UPDATED: 'POST_UPDATED',
  POST_CLICKED_DELETE: 'POST_CLICKED_DELETE',
  POST_CONFIRMED_DELETE: 'POST_CONFIRMED_DELETE',
  POST_DELETED: 'POST_DELETED',
  POST_CANCELED_DELETE: 'POST_CANCELED_DELETE',
  POST_ERROR: 'POST_ERROR',
  OPEN_COMPOSER: 'OPEN_COMPOSER',
  HIDE_COMPOSER: 'HIDE_COMPOSER',
};

const initialState = {
  byProfileId: {},
  showComposer: false,
  enabledApplicationModes: [],
  environment: 'production',
};

const profileInitialState = {
  loading: true,
  loadingMore: false,
  moreToLoad: false,
  page: 1,
  posts: {},
  total: 0,
};

const determineIfMoreToLoad = (action, currentPosts) => {
  const currentPostCount = Object.keys(currentPosts).length;
  const resultUpdatesCount = Object.keys(action.result.updates).length;
  return (action.result.total > (currentPostCount + resultUpdatesCount));
};

const getProfileId = (action) => {
  if (action.profileId) { return action.profileId; }
  if (action.args) { return action.args.profileId; }
  if (action.profile) { return action.profile.id; }
};

/**
 * Reducers
 */

const postReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.POST_CREATED:
    case actionTypes.POST_UPDATED:
      return action.post;
    case actionTypes.POST_CLICKED_DELETE:
      return {
        ...state,
        isConfirmingDelete: true,
      };
    case actionTypes.POST_CONFIRMED_DELETE:
      return {
        ...state,
        isConfirmingDelete: false,
        isDeleting: true,
      };
    case actionTypes.POST_CANCELED_DELETE:
      return {
        ...state,
        isConfirmingDelete: false,
      };
    case actionTypes.POST_ERROR:
      return state;
    default:
      return state;
  }
};

const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case `queuedPosts_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { updates } = action.result;
      if (action.args.isFetchingMore) {
        return { ...state, ...updates };
      }
      return updates;
    }
    case actionTypes.POST_DELETED: {
      const { [action.post.id]: deleted, ...currentState } = state;
      return currentState;
    }
    case actionTypes.POST_CREATED:
    case actionTypes.POST_UPDATED:
    case actionTypes.POST_CLICKED_DELETE:
    case actionTypes.POST_CONFIRMED_DELETE:
    case actionTypes.POST_CANCELED_DELETE:
    case actionTypes.POST_ERROR:
      return {
        ...state,
        [action.post.id]: postReducer(state[action.post.id], action),
      };
    default:
      return state;
  }
};

const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case `queuedPosts_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: !action.args.isFetchingMore,
        loadingMore: action.args.isFetchingMore,
      };
    case `queuedPosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        moreToLoad: determineIfMoreToLoad(action, state.posts),
        page: state.page + 1,
        posts: postsReducer(state.posts, action),
        total: action.result.total,
      };
    case `queuedPosts_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.POST_CREATED:
    case actionTypes.POST_UPDATED:
    case actionTypes.POST_CLICKED_DELETE:
    case actionTypes.POST_CONFIRMED_DELETE:
    case actionTypes.POST_DELETED:
    case actionTypes.POST_CANCELED_DELETE:
    case actionTypes.POST_ERROR: {
      let adjustTotal = 0;
      if (action.type === actionTypes.POST_CREATED) {
        adjustTotal = 1;
      } else if (action.type === actionTypes.POST_DELETED) {
        adjustTotal = -1;
      }
      return {
        ...state,
        posts: postsReducer(state.posts, action),
        total: state.total + adjustTotal,
      };
    }
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  let profileId;
  switch (action.type) {
    case profileSidebarActionTypes.SELECT_PROFILE:
    case `queuedPosts_${dataFetchActionTypes.FETCH_START}`:
    case `queuedPosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `queuedPosts_${dataFetchActionTypes.FETCH_FAIL}`:
    case actionTypes.POST_CREATED:
    case actionTypes.POST_UPDATED:
    case actionTypes.POST_CLICKED_DELETE:
    case actionTypes.POST_CONFIRMED_DELETE:
    case actionTypes.POST_DELETED:
    case actionTypes.POST_CANCELED_DELETE:
    case actionTypes.POST_ERROR:
      profileId = getProfileId(action);
      if (profileId) {
        return {
          ...state,
          byProfileId: {
            ...state.byProfileId,
            [profileId]: profileReducer(state.byProfileId[profileId], action),
          },
        };
      }
      return state;
    case `enabledApplicationModes_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        enabledApplicationModes: action.result.enabledApplicationModes,
      };
    case `environment_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        environment: action.result.environment,
      };
    case actionTypes.OPEN_COMPOSER:
      return {
        ...state,
        showComposer: true,
      };
    case actionTypes.HIDE_COMPOSER:
      return {
        ...state,
        showComposer: false,
      };
    default:
      return state;
  }
};

export const actions = {
  handleDeleteClick: ({ post, profileId }) => ({
    type: actionTypes.POST_CLICKED_DELETE,
    updateId: post.id,
    post,
    profileId,
  }),

  handleDeleteConfirmClick: ({ post, profileId }) => ({
    type: actionTypes.POST_CONFIRMED_DELETE,
    updateId: post.id,
    post,
    profileId,
  }),

  handleCancelConfirmClick: ({ post, profileId }) => ({
    type: actionTypes.POST_CANCELED_DELETE,
    updateId: post.id,
    post,
    profileId,
  }),
  handleComposerPlaceholderClick: () => ({
    type: actionTypes.OPEN_COMPOSER,
  }),
  handleComposerCreateSuccess: () => ({
    type: actionTypes.HIDE_COMPOSER,
  }),
};
