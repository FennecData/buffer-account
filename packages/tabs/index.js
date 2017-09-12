import { push } from 'react-router-redux';
import { generateProfilePageRoute } from '@bufferapp/publish-routes';
import { connect } from 'react-redux';
// load the presentational component
import TabNavigation from './components/TabNavigation';


// default export = container
export default connect(
  (state, ownProps) => ({
    selectedTabId: ownProps.tabId,
  }),
  (dispatch, ownProps) => ({
    onTabClick: tabId => dispatch(push(generateProfilePageRoute({
      tabId,
      profileId: ownProps.profileId,
    }))),
  }),
)(TabNavigation);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
