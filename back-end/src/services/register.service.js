require('dotenv/config');
const { Op } = require('sequelize');
const { users } = require('../database/models');
const passwordEncryption = require('../utils/cryptography.utilities');
const JwtUtilities = require('../utils/jwt.utilities');

const registerNewUser = async (name, email, rawPassword) => {
  const password = passwordEncryption.encryptPassword(rawPassword);

  const user = await users.findOne({ where: { [Op.or]: [{ name }, { email }] } });
  if (user) {
    const e = new Error('Name or email is already in use');
    e.name = 'Conflict';
    throw e;
  }

  const { dataValues } = await users.create({ name, email, password, role: 'customer' });

  const token = JwtUtilities.createToken(dataValues);

  return { ...dataValues, token };
};

module.exports = {
  registerNewUser,
  };
