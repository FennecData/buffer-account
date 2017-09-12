// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
// load the presentational component
import QueuedPosts from './components/QueuedPosts';
import { actions } from './reducer';

const formatPostLists = (posts) => {
  const postLists = [];
  let day;
  let newList;
  const postIds = Object.keys(posts);

  postIds.forEach((postId) => {
    if (posts[postId].day !== day) {
      day = posts[postId].day;
      newList = { listHeader: day, posts: [posts[postId]] };
      postLists.push(newList);
    } else { // if same day add to posts array of current list
      newList.posts.push(posts[postId]);
    }
  });

  return postLists;
};

// default export = container
export default connect(
  (state, ownProps) => {
    const profileId = ownProps.profileId;
    const currentProfile = state.queue.byProfileId[profileId];
    if (currentProfile) {
      return {
        loading: currentProfile.loading,
        loadingMore: currentProfile.loadingMore,
        moreToLoad: currentProfile.moreToLoad,
        page: currentProfile.page,
        postLists: formatPostLists(currentProfile.posts),
        total: currentProfile.total,
        enabledApplicationModes: state.queue.enabledApplicationModes,
        showComposer: state.queue.showComposer,
        environment: state.queue.environment,
      };
    }
    return {};
  },
  (dispatch, ownProps) => ({
    onDeleteClick: (post) => {
      dispatch(actions.handleDeleteClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onDeleteConfirmClick: (post) => {
      dispatch(actions.handleDeleteConfirmClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onCancelConfirmClick: (post) => {
      dispatch(actions.handleCancelConfirmClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onComposerPlaceholderClick: () => {
      dispatch(actions.handleComposerPlaceholderClick());
    },
    onComposerCreateSuccess: () => {
      dispatch(actions.handleComposerCreateSuccess());
    },
  }),
)(QueuedPosts);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
/*
a consumer of a package should be able to use the package in the following way:
import Example, { actions, actionTypes, middleware, reducer } from '@bufferapp/publish-example';
*/
