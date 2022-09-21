require('dotenv/config');
const JwtUtilities = require('../utils/jwt.utilities');
const passwordEncryption = require('../utils/cryptography.utilities');

const validateCredentials = async (email, password) => {
  const encryptedPassword = passwordEncryption.encryptPassword(password);

  const user = await passwordEncryption.verifyPassword(email, encryptedPassword);

  const token = JwtUtilities.createToken(user.dataValues);

  return token;
};
module.exports = {
    validateCredentials,
  };