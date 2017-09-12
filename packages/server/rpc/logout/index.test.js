import RPCClient from 'micro-rpc-client';
import logout from './';

describe('rpc/logout', () => {
  it('should have the expected name', () => {
    expect(logout.name)
      .toBe('logout');
  });

  it('should have the expected docs', () => {
    expect(logout.docs)
      .toBe('logout with a session token');
  });

  it('should check if success response', async () => {
    const token = 'some token';
    const response = await logout.fn({ token });
    expect(response)
      .toBe('OK');
  });

  it('should destroy a session', async () => {
    const token = 'some token';
    await logout.fn({ token });
    expect(RPCClient.prototype.call)
      .toBeCalledWith('destroy', { token });
  });
});
