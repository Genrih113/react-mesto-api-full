const jwt = require('jsonwebtoken');

const { setCustomErrorStatusAndMessage } = require('../helpers/error-handling-helpers');

const { NODE_ENV, JWT_SECRET } = process.env;

const tokenSignatureKey = (NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

// const handleAuthError = (res) => {
//   res
//     .status(401)
//     .send({ message: 'Необходима авторизация' });
// };

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return setCustomErrorStatusAndMessage(401, 'Необходима авторизация');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, tokenSignatureKey);
  } catch (err) {
    return setCustomErrorStatusAndMessage(401, 'Необходима авторизация');
  }

  req.user = payload;
  return next();
};
