export const actionTypes = {
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
};

const initialState = {

};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    default:
      return state;
  }
};

export const actions = {
  handleChangePassword: ({ currentPassword, newPassword }) => ({
    type: actionTypes.CHANGE_PASSWORD,
    currentPassword,
    newPassword,
  }),
};
