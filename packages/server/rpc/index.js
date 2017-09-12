const { rpc } = require('@bufferapp/micro-rpc');
const checkToken = require('./checkToken');
const loginMethod = require('./login');
const logoutMethod = require('./logout');
const profilesMethod = require('./profiles');
const queuedPostsMethod = require('./queuedPosts');
const sentPostsMethod = require('./sentPosts');
const userMethod = require('./user');
const deletePostMethod = require('./deletePost');
const enabledApplicationModesMethod = require('./enabledApplicationModes');
const apiWrapperMethod = require('./apiWrapper');
const environmentMethod = require('./environment');

module.exports = checkToken(rpc(
  loginMethod,
  logoutMethod,
  profilesMethod,
  queuedPostsMethod,
  sentPostsMethod,
  userMethod,
  deletePostMethod,
  enabledApplicationModesMethod,
  apiWrapperMethod,
  environmentMethod,
));
