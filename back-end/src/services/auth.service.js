require('dotenv/config');
const JwtUtilities = require('../utils/JwtUtilities')

// import JwtUtilities from '../utils/JwtUtilities'

const { User }  = require('../database/models');

const validateCredentials = async ( email, password ) => {

  const user = await User.findOne({ where: { email, password } });
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
  