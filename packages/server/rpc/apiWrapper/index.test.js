/* eslint-disable import/first */
import bufferApi from './';

describe('rpc/apiWrapper', () => {
  it('should have the expected name', () => {
    expect(bufferApi.name)
      .toBe('bufferApi');
  });
});
