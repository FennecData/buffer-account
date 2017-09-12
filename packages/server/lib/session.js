const jwt = require('jsonwebtoken');
const RPCClient = require('micro-rpc-client');

const isDevelopment = process.env.NODE_ENV === 'development';
const COOKIE_NAME = 'session';
  // isDevelopment ?
  // 'buffer-session-2-local' :
  // 'buffer-session-2';
const COOKIE_DOMAIN = isDevelopment ? '.local.buffer.com' : '.buffer.com';
const client = new RPCClient({
  url: `http://${process.env.SESSION_SVC_HOST}`,
});

exports = module.exports;

// returns the encoded session jwt
exports.create = session =>
  client.call('create', { session })
    .then(({ token }) => ({ token, session }));

// Given a jwt return the session object
exports.get = sessionCookie =>
  client.call('get', { token: sessionCookie })
    .then(({ token }) => jwt.decode(token));

exports.update = ({ token, session }) =>
  client.call('update', { token, session });

// Given a jwt and the response object, set the session cookie
exports.writeCookie = (token, res) => {
  res.cookie(COOKIE_NAME, token, {
    domain: COOKIE_DOMAIN,
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    // NOTE - We should enable httpOnly if we skip manually sending the cookie on the front-end
    // httpOnly: true,
    // secure: true, // TODO :)
  });
};

exports.getCookie = req => req.cookies[COOKIE_NAME];

exports.middleware = (req, res, next) => {
  const sessionCookie = exports.getCookie(req);
  if (!sessionCookie) {
    return next();
  }

  exports.get(sessionCookie)
    .then((decodedSession) => {
      req.session = decodedSession;
      next();
    })
    .catch(next);
};
