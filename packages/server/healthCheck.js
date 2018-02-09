const { isShutingDown } = require('@bufferapp/shutdown-helper');
const {
  sessionClient,
} = require('@bufferapp/session-manager');

const createSessionServiceVersion = () =>
  process.env.SESSION_VERSION;

module.exports = (req, res) => {
  if (isShutingDown()) {
    return res.status(500).json({ status: 'shutting down' });
  }
  const client = sessionClient({
    production: req.app.get('useProductionServices'),
    sessionVersion: createSessionServiceVersion(),
  });
  client.listMethods()
    .then(() => res.status(200).json({ status: 'awesome' }))
    .catch(() => res.status(500).json({ status: 'cannot connect to session service' }));
};
