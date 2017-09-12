import Pusher from 'pusher-js';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar';
import { postParser } from '@bufferapp/publish-utils';

import middleware from './middleware';

describe('middleware', () => {
  const store = {
    dispatch: jest.fn(),
    getState: () => ({ }),
  };
  const next = jest.fn();
  const selectProfileAction = {
    type: profileSidebarActionTypes.SELECT_PROFILE,
    profileId: '12345',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call next when running middleware', () => {
    middleware(store)(next)(selectProfileAction);
    expect(next)
      .toBeCalled();
  });

  it('should create a new pusher instance', () => {
    middleware(store)(next)(selectProfileAction);
    expect(Pusher)
      .toHaveBeenCalledWith(
        'bd9ba9324ece3341976e',
        { authEndpoint: '/pusher/auth' },
      );
  });

  it('should subscribe to private updates channel', () => {
    middleware(store)(next)(selectProfileAction);
    expect(Pusher.subscribe)
      .toHaveBeenCalledWith('private-updates-12345');
  });

  it('should subscribe to update events', () => {
    middleware(store)(next)(selectProfileAction);
    expect(Pusher.bind.mock.calls[0][0]).toEqual('private-updates-12345');
    expect(Pusher.bind.mock.calls[0][1]).toEqual('added_update');
    expect(Pusher.bind.mock.calls[1][0]).toEqual('private-updates-12345');
    expect(Pusher.bind.mock.calls[1][1]).toEqual('sent_update');
    expect(Pusher.bind.mock.calls[2][0]).toEqual('private-updates-12345');
    expect(Pusher.bind.mock.calls[2][1]).toEqual('deleted_update');
    expect(Pusher.bind.mock.calls[3][0]).toEqual('private-updates-12345');
    expect(Pusher.bind.mock.calls[3][1]).toEqual('updated_update');
    expect(Pusher.bind).toHaveBeenCalledTimes(4);
  });

  it('should dispatch when a subscribed pusher event happens', () => {
    middleware(store)(next)(selectProfileAction);
    const update = { id: '00012345', text: 'Hello, world.' };
    Pusher.simulate('private-updates-12345', 'added_update', { update });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'POST_CREATED',
      profileId: '12345',
      post: postParser(update),
    });
  });
});
