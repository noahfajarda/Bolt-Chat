const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  signToken: function (session) {
    const payload = session;
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
