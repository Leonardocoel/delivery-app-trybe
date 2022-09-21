require('dotenv/config');
const JwtUtilities = require('../utils/jwt.utilities');
const { users } = require('../database/models');

const validateCredentials = async (email, password) => {
  const user = await users.findOne({ where: { email, password } });
  if (!user) {
    const e = new Error('Invalid fields');
    e.name = 'ValidationError';
    throw e;
  }

  const token = JwtUtilities.createToken(user.dataValues);

  return token;
};

module.exports = {
    validateCredentials,
  };
