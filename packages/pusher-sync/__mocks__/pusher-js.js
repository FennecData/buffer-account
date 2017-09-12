const Pusher = jest.fn();
Pusher.channelEventHandlers = {};
Pusher.bind = jest.fn((channelName, event, handler) => {
  Pusher.channelEventHandlers[`${channelName}-${event}`] = jest.fn(handler);
});
Pusher.subscribe = jest.fn(channelName => ({
  bind: (event, handler) => Pusher.bind(channelName, event, handler),
}));
Pusher.simulate = (channelName, event, payload) => {
  Pusher.channelEventHandlers[`${channelName}-${event}`](payload);
};
const socket = (appKey, options) => ({
  appKey,
  options,
  subscribe: Pusher.subscribe,
});
Pusher.mockImplementation(jest.fn((appKey, options) => socket(appKey, options)));
module.exports = Pusher;
