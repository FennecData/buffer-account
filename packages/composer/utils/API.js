/**
 * Thin wrapper around @bufferapp/buffer-js-api that automatically
 * attaches the CSRF token to requests, and enforces absolute urls.
 */

import RPCClient from 'micro-rpc-client';

import BufferAPI from '@bufferapp/buffer-js-api';
import AppStore from '../stores/AppStore';
import { bufferOrigins } from '../AppConstants';

class API extends BufferAPI {
  static request(url, data = {}, settings, apiSettings = {}) {
    const { onNewPublish } = AppStore.getUserData();

    if (onNewPublish) {
      const rpc = new RPCClient({ url: '/rpc' });

      return rpc.call('bufferApi', {
        url: `/1/${url}`,
        args: data,
        token: AppStore.getUserData().accessToken,
      });
    }

    const { environment } = AppStore.getMetaData();

    const defaultData = {
      csrf_token: AppStore.getCsrfToken(),
    };

    data = Object.assign(defaultData, data);

    const defaultSettings = {
      endpoint: `${bufferOrigins.get(environment)}/api/`,
    };

    apiSettings = Object.assign(defaultSettings, apiSettings);

    return BufferAPI.request(url, data, settings, apiSettings);
  }
}

export default API;
