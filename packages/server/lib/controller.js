const { join } = require('path');
const RPCClient = require('micro-rpc-client');
const { isShutingDown } = require('@bufferapp/shutdown-helper');
const bufferApi = require('./bufferApi');
const sessionUtils = require('./session');

const controller = module.exports;

controller.login = (req, res) => {
  res.sendFile(join(__dirname, '../views/login.html'));
};

controller.handleLogin = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.send('missing required fields');
  }

  bufferApi.signin({
    email: req.body.email,
    password: req.body.password,
  })
    .then(({ token, user, twostep }) => {
      const newSession = {
        userId: user._id,
        accessToken: token,
      };
      if (twostep) {
        newSession.tfa = twostep;
      }
      return sessionUtils.create(newSession);
    })
    .then(({ session, token }) => {
      sessionUtils.writeCookie(token, res);
      const redirectURL = session.tfa ? '/login/tfa' : '/';
      res.redirect(redirectURL);
    })
    .catch(next);
};

controller.tfa = (req, res) => {
  if (!req.session.tfa) {
    return res.redirect('/');
  }
  res.sendFile(join(__dirname, '../views/tfa.html'));
};

controller.handleTfa = (req, res, next) => {
  if (!req.session.tfa || (req.session.tfa && !req.session.userId)) {
    return res.redirect('/login');
  }
  if (!req.body.code) {
    return res.send('missing required fields');
  }

  bufferApi.tfa({
    userId: req.session.userId,
    code: req.body.code,
  })
    .then(({ token }) => {
      req.session.accessToken = token;
      delete req.session.tfa;
      const sessionToken = sessionUtils.getCookie(req);
      return sessionUtils.update({ token: sessionToken, session: req.session });
    })
    .then(() => res.redirect('/'))
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
