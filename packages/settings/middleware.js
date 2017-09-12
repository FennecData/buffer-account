export default ({ dispatch }) => next => (action) => { // eslint-disable-line no-unused-vars
  next(action);
  switch (action.type) {
    // case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`:
    //   return {
    //     ...state,
    //     profiles: action.result
    //       .filter(profile => !profile.locked)
    //       .map(profileMapper),
    //     lockedProfiles: action.result
    //       .filter(profile => profile.locked)
    //       .map(profileMapper),
    //   };
    //   break;
    default:
      break;
  }
};
