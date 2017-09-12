const { postParser, buildPostMap } = require('@bufferapp/publish-utils');
const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');

module.exports = method(
  'queuedPosts',
  'fetch queued posts',
  ({ profileId, page }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/updates/pending.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.accessToken,
        page,
        count: 20,
      },
    })
      .then(result => JSON.parse(result))
      .then((parsedResult) => {
        const updates = parsedResult.updates.map(postParser);
        const mappedUpdates = buildPostMap(updates);
        return {
          total: parsedResult.total,
          updates: mappedUpdates,
        };
      }),
);
