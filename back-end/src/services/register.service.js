require('dotenv/config');
const { Op } = require('sequelize');
const { users } = require('../database/models');
const passwordEncryption = require('../utils/cryptography.utilities');
const { validateCredentials } = require('./auth.service');

const registerNewUser = async (name, email, password) => {
  const encryptedPassword = passwordEncryption.encryptPassword(password);

  const newUser = await users.findOne({ where: { [Op.or]: [{ name }, { email }] } });
  if (newUser) {
    const e = new Error('Name or email is already in use');
    e.name = 'Conflict';
    throw e;
  }
  const result = await users.create({ name, email, password: encryptedPassword, role: 'customer' });
  console.log(result);

  const payload = validateCredentials(email, password);

  return payload;
  // };
};

module.exports = {
  registerNewUser,
  };
