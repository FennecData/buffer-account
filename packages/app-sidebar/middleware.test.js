import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import middleware from './middleware';

describe('middleware', () => {
  it('should fetch user after login', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: `login_${dataFetchActionTypes.FETCH_SUCCESS}`,
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({ name: 'user' }));
  });
});
