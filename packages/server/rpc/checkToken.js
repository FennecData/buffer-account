const jwt = require('jsonwebtoken');
const {
  json,
  createError,
} = require('micro');
const RPCClient = require('micro-rpc-client');

const rpcClient = new RPCClient({
  url: `http://${process.env.SESSION_SVC_HOST}`,
});

const whitelistedRPCNames = [
  'login',
  'methods',
];

module.exports = next => async (req, res) => {
  const data = await json(req);
  const { name, args } = data;
  const parsedArgs = args ? JSON.parse(args) : undefined;
  if (whitelistedRPCNames.includes(name)) {
    return next(req, res);
  }
  if (!parsedArgs.token) {
    const errorMessage = 'Missing session token';
    res.statusMessage = errorMessage;
    throw createError(401, errorMessage);
  }
  try {
    const { token } = await rpcClient.call('get', {
      token: parsedArgs.token,
    });
    const session = jwt.decode(token);
    req.session = session;
    return next(req, res);
  } catch (err) {
    const errorMessage = err.message;
    res.statusMessage = errorMessage;
    throw createError(401, errorMessage);
  }
};
