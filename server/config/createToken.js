const jwt = require('jsonwebtoken');
const { tokenKey } = require('./config');

module.exports = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    },
    tokenKey,
    {
      expiresIn: '24h',
    }
  );
};
