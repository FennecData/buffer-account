const rp = require('request-promise');

const BUFFER_API_ADDR = process.env.API_ADDR;

const bufferApi = module.exports;

bufferApi.signin = ({
  email,
  password,
  clientId,
  clientSecret,
  bufferSession,
}) => rp({
  uri: `${BUFFER_API_ADDR}/1/user/signin.json`,
  method: 'POST',
  strictSSL: false, // TODO - In prod this should be secure
  form: {
    client_id: clientId,
    client_secret: clientSecret,
    email,
    password,
    buffer_session: bufferSession,
  },
  json: true,
  resolveWithFullResponse: true,
});

// TODO - Add backup phone number usage
// TODO - Add visitor_id linking when session is used on marketing
bufferApi.tfa = ({
  userId,
  code,
  clientId,
  clientSecret,
  bufferSession,
}) => rp({
  uri: `${BUFFER_API_ADDR}/1/user/twostep.json`,
  method: 'POST',
  strictSSL: false, // TODO - In prod this should be secure
  form: {
    client_id: clientId,
    client_secret: clientSecret,
    user_id: userId,
    code,
    buffer_session: bufferSession,
  },
  json: true,
  resolveWithFullResponse: true,
});


bufferApi.convertSession = ({
  accessToken,
  clientId,
  clientSecret,
  bufferSession,
}) => rp({
  uri: `${BUFFER_API_ADDR}/1/user/convert_access_token.json`,
  method: 'POST',
  strictSSL: false, // TODO - In prod this should be secure
  form: {
    client_id: clientId,
    client_secret: clientSecret,
    access_token: accessToken,
    buffer_session: bufferSession,
  },
  json: true,
  resolveWithFullResponse: true,
});
