require('dotenv/config');
const JwtUtilities = require('../utils/jwt.utilities');
const passwordEncryption = require('../utils/cryptography.utilities');

const AuthService = async (email, password) => {
  const user = await passwordEncryption.verifyUser(email, password);

  const token = JwtUtilities.createToken(user);

  return { ...user, token };
};
module.exports = {
    AuthService,
  };