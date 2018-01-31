const ObjectPath = require('object-path');
const {
  getSession,
} = require('./session');
const {
  loginServiceUrl,
} = require('./urls');

const setRequestSession = ({
  production,
  sessionKeys,
}) =>
  async (req, res, next) => {
    try {
      const session = await getSession({
        req,
        production,
        sessionKeys,
      });
      req.session = session;
      next();
    } catch (err) {
      next(err);
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
    `${loginServiceUrl({ production })}/login/`;
  res.redirect(`${baseUrl}?redirect=${redirect}`);
};

module.exports = {
  setRequestSession,
  validateSession,
};
