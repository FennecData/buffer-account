import { push } from 'react-router-redux';
import { generateProfilePageRoute } from '@bufferapp/publish-routes';
import { connect } from 'react-redux';
import ProfileSidebar from './components/ProfileSidebar';
import { actions } from './reducer';

export default connect(
  (state, ownProps) => ({
    selectedProfile: state.profileSidebar.selectedProfile,
    selectedProfileId: ownProps.profileId,
    profiles: state.profileSidebar.profiles,
    lockedProfiles: state.profileSidebar.lockedProfiles,
    translations: state.i18n.translations['profile-sidebar'],
  }),
  (dispatch, ownProps) => ({
    onProfileClick: (profile) => {
      if (profile.id !== ownProps.profileId) {
        dispatch(push(generateProfilePageRoute({
          profileId: profile.id,
          tabId: ownProps.tabId,
        })));
        dispatch(actions.selectProfile({
          profile,
        }));
      }
    },
  }),
)(ProfileSidebar);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
