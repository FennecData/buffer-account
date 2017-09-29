const ejs = require('ejs');
const { join } = require('path');
const { parse } = require('url');
const RPCClient = require('micro-rpc-client');
const { isShutingDown } = require('@bufferapp/shutdown-helper');
const bufferApi = require('./bufferApi');
const sessionUtils = require('./session');

const controller = module.exports;

const selectClient = ({
  app,
}) => {
  switch (app) {
    case 'publish':
      return ({
        clientId: process.env.PUBLISH_CLIENT_ID,
        clientSecret: process.env.PUBLISH_CLIENT_SECRET,
        sessionKey: 'publish',
      });
    case 'analyze':
      return ({
        clientId: process.env.ANALYZE_CLIENT_ID,
        clientSecret: process.env.ANALYZE_CLIENT_SECRET,
        sessionKey: 'analyze',
      });
    case 'account':
      return ({
        clientId: process.env.PUBLISH_CLIENT_ID,
        clientSecret: process.env.PUBLISH_CLIENT_SECRET,
        sessionKey: 'account',
      });
    default:
      return ({
        clientId: process.env.PUBLISH_CLIENT_ID,
        clientSecret: process.env.PUBLISH_CLIENT_SECRET,
        sessionKey: 'account',
      });
  }
};

const parseAppFromUrl = ({
  url,
}) => {
  if (url) {
    if (url.includes('publish')) {
      return 'publish';
    } else if (url.includes('analyze')) {
      return 'analyze';
    }
  }
  return 'account';
};

const getAnyAccessToken = ({
  session = {},
}) => Object.keys(session).reduce((accessToken, key) => {
  if ('accessToken' in session[key]) {
    return session[key].accessToken;
  }
  return accessToken;
}, undefined);

const autoLoginWithAccessToken = ({
  accessToken,
  redirect,
  req,
  res,
  next,
}) => {
  const url = redirect ? parse(redirect).hostname : undefined;
  const { clientId, clientSecret, sessionKey } = selectClient({
    app: parseAppFromUrl({ url }),
  });
  bufferApi.convertSession({
    accessToken,
    clientId,
    clientSecret,
  })
    .then(({ token }) => {
      const newSession = {
        [sessionKey]: {
          accessToken: token,
        },
      };
      return sessionUtils.update({
        token: sessionUtils.getCookie(req),
        session: newSession,
      });
    })
    .then(() => res.redirect(redirect || '/'))
    .catch(next);
};

const autoLoginWithBufferSession = ({
  redirect,
  bufferSession,
  res,
  next,
}) => {
  const url = redirect ? parse(redirect).hostname : undefined;
  const { clientId, clientSecret, sessionKey } = selectClient({
    app: parseAppFromUrl({ url }),
  });
  bufferApi.convertSession({
    bufferSession,
    clientId,
    clientSecret,
  })
    .then(({ user, token }) => {
      const newSession = {
        global: {
          userId: user._id,
        },
        [sessionKey]: {
          accessToken: token,
        },
      };
      return sessionUtils.create(newSession);
    })
    .then(({ token }) => {
      sessionUtils.writeCookie(token, res);
      res.redirect(redirect || '/');
    })
    .catch(next);
};

controller.login = (req, res, next) => {
  const { redirect } = req.query;
  const accessToken = getAnyAccessToken({ session: req.session || {} });
  const bufferSession = sessionUtils.getBufferWebCookie(req);
  if (accessToken) {
    autoLoginWithAccessToken({
      accessToken,
      redirect,
      req,
      res,
      next,
    });
  } else if (bufferSession) {
    autoLoginWithBufferSession({
      bufferSession,
      redirect,
      req,
      res,
      next,
    });
  } else {
    ejs.renderFile(
      join(__dirname, '../views/login.html'),
      { redirect },
      (err, html) => {
        res.send(html);
      });
  }
};

// if the user makes it here that means the user is signing
// in for the first time anywhere
controller.handleLogin = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.send('missing required fields');
  }

  const url = req.body.redirect ? parse(req.body.redirect).hostname : undefined;
  const { clientId, clientSecret, sessionKey } = selectClient({
    app: parseAppFromUrl({ url }),
  });

  bufferApi.signin({
    email: req.body.email,
    password: req.body.password,
    clientId,
    clientSecret,
  })
    .then(({ token, user, twostep }) => {
      const newSession = {
        global: {
          userId: user._id,
        },
      };
      if (twostep) {
        newSession.global.tfa = twostep;
      } else {
        newSession[sessionKey] = {
          accessToken: token,
        };
      }
      return sessionUtils.create(newSession);
    })
    .then(({ session, token }) => {
      sessionUtils.writeCookie(token, res);
      let redirectURL = '/';
      if (session.global.tfa) {
        redirectURL = req.body.redirect ?
          `/login/tfa?redirect=${req.body.redirect}` :
          '/login/tfa';
      } else if (req.body.redirect) {
        redirectURL = req.body.redirect;
      }
      res.redirect(redirectURL);
    })
    .catch(next);
};

controller.tfa = (req, res) => {
  const { redirect } = req.query;
  if (!(req.session && req.session.global && req.session.global.tfa)) {
    res.redirect(`/login/${redirect ? `?redirect=${redirect}` : ''}`);
  } else {
    ejs.renderFile(
      join(__dirname, '../views/tfa.html'),
      { redirect },
      (err, html) => {
        res.send(html);
      });
  }
};

controller.handleTfa = (req, res, next) => {
  const { redirect, code } = req.body;
  if (!(
    res.session &&
    req.session.global &&
    req.session.global.tfa &&
    req.session.global.userId
  )) {
    res.redirect(`/login/${redirect ? `?redirect=${redirect}` : ''}`);
  }
  if (!code) {
    return res.send('missing required fields');
  }

  const url = redirect ? parse(redirect).hostname : undefined;
  const { clientId, clientSecret, sessionKey } = selectClient({
    app: parseAppFromUrl({ url }),
  });

  bufferApi.tfa({
    userId: req.session.global.userId,
    code,
    clientId,
    clientSecret,
  })
    .then(({ token }) => {
      const updatedSession = {
        global: {
          userId: req.session.global.userId,
        },
        [sessionKey]: {
          accessToken: token,
        },
      };
      return sessionUtils.update({
        token: sessionUtils.getCookie(req),
        session: updatedSession,
      });
    })
    .then(() => res.redirect(redirect || '/'))
    .catch(next);
};

controller.signout = (req, res) => {
  res.send('signout page');
};

controller.healthCheck = (req, res) => {
  if (isShutingDown()) {
    return res.status(500).json({ status: 'shutting down' });
  }
  const sessionClient = new RPCClient({
    url: `http://${process.env.SESSION_SVC_HOST}`,
  });
  sessionClient.listMethods()
    .then(() => res.status(200).json({ status: 'awesome' }))
    .catch(() => res.status(500).json({ status: 'cannot connect to session service' }));
};
