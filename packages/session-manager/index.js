const RPCClient = require('micro-rpc-client');
const ObjectPath = require('object-path');
const jwt = require('jsonwebtoken');

const sessionExports = module.exports;

// the version of the session service to create new sessions
// existing sessions can have different versions
const createSessionServiceVersion = () =>
  process.env.SESSION_VERSION;

sessionExports.createSessionServiceVersion = createSessionServiceVersion;

// TODO: remove beta '1' version after its been removed
const sessionServiceUrl = ({
  sessionVersion = '1',
  production,
}) =>
  `http://session-service-${sessionVersion}${production ? '.buffer' : ''}`;

const sessionClient = ({
  sessionVersion,
  production,
}) => new RPCClient({ url: sessionServiceUrl({ sessionVersion, production }) });

sessionExports.sessionClient = sessionClient;

sessionExports.serviceUrl = ({ production }) => `https://account${production ? '' : '.local'}.buffer.com`;

const currentUrl = () => window.location.href;

sessionExports.logoutUrl = ({ production }) =>
  `${sessionExports.serviceUrl({ production })}/logout/?redirect=${currentUrl()}`;

sessionExports.cookieName = ({ production }) =>
  (production ? 'buffer_session' : 'local_buffer_session');

sessionExports.cookieDomain = ({ production }) =>
  (production ? '.buffer.com' : '.local.buffer.com');

sessionExports.getCookie = ({ req, name }) =>
  req.cookies[name];

sessionExports.writeCookie = ({
  name,
  value,
  domain,
  maxAge = 365 * 24 * 60 * 60 * 1000,
  httpOnly = true,
  secure = true,
  res,
}) => {
  res.cookie(name, value, {
    domain,
    maxAge,
    httpOnly,
    secure,
  });
};

sessionExports.createSession = async ({
  session,
  production,
  res,
  userId,
}) => {
  // this will throw errors when a session cannot be created
  const { token } = await sessionClient({
    sessionVersion: createSessionServiceVersion(),
    production,
  }).call('create', {
    session,
    userId,
  });
  sessionExports.writeCookie({
    name: sessionExports.cookieName({ production }),
    value: token,
    domain: sessionExports.cookieDomain({ production }),
    res,
  });
  return {
    token,
    session,
  };
};

sessionExports.updateSession = async ({
  session,
  req,
  production,
}) => {
  const sessionCookie = sessionExports.getCookie({
    name: sessionExports.cookieName({ production }),
    req,
  });
  const { sessionVersion } = jwt.decode(sessionCookie);
  return sessionClient({
    sessionVersion,
    production,
  }).call('update', {
    session,
    token: sessionCookie,
    sessionVersion,
  });
};

sessionExports.destroySession = async({
  req,
  res,
  production,
}) => {
  const cookieName = sessionExports.cookieName({ production });
  const sessionCookie = sessionExports.getCookie({
    name: cookieName,
    req,
  });
  const { sessionVersion } = jwt.decode(sessionCookie);
  await sessionClient({
    sessionVersion,
    production,
  }).call('destroy', {
    token: sessionCookie,
    sessionVersion,
  });
  res.clearCookie(cookieName, {
    domain: sessionExports.cookieDomain({ production }),
  });
  res.clearCookie(`${production ? '' : 'local'}bufferapp_ci_session`, {
    domain: '.buffer.com',
  });
};

const getSession = ({
  production,
  sessionKeys,
}) =>
  async (req, res, next) => {
    const sessionCookie = sessionExports.getCookie({
      name: sessionExports.cookieName({ production }),
      req,
    });
    if (!sessionCookie) {
      return next();
    }
    try {
      const { sessionVersion } = jwt.decode(sessionCookie);
      const session = await sessionClient({
        sessionVersion,
        production,
      }).call('get', {
        token: sessionCookie,
        keys: sessionKeys,
        sessionVersion,
      });
      req.session = session;
      return next();
    } catch (err) {
      return next(err);
    }
  };


const validateSession = ({
  requiredSessionKeys,
  production,
}) => (req, res, next) => {
  let allValidKeys = true;
  requiredSessionKeys.forEach((key) => {
    if (!ObjectPath.has(req.session, key)) {
      allValidKeys = false;
    }
  });
  if (allValidKeys && req.session) {
    return next();
  }
  const redirect = encodeURIComponent(`https://${req.get('host')}${req.originalUrl}`);
  const baseUrl =
    `${sessionExports.serviceUrl({ production })}/login/`;
  res.redirect(`${baseUrl}?redirect=${redirect}`);
};

sessionExports.middleware = {
  getSession,
  validateSession,
};
