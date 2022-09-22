require('dotenv/config');
const JwtUtilities = require('../utils/jwt.utilities');
const passwordEncryption = require('../utils/cryptography.utilities');

const validateCredentials = async (email, password) => {
  const encryptedPassword = passwordEncryption.encryptPassword(password);

  const {
    password: noPassword,
    ...userWithoutPassword
  } = await passwordEncryption.verifyPassword(email, encryptedPassword);

  const token = JwtUtilities.createToken(userWithoutPassword);
  return token;
};
module.exports = {
    validateCredentials,
  };