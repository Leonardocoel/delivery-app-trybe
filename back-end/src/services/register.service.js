require('dotenv/config');
const { users } = require('../database/models');
const passwordEncryption = require('../utils/cryptography.utilities');

const registerNewUser = async (username, email, password) => {
  const encryptedPassword = passwordEncryption.encryptPassword(password);

  const newUser = await users.findOne({ where: { email, username } });
  if (newUser) {
    const e = new Error('User already exists');
    e.name = 'Conflict';
    throw e;
  }
  await users.create({ username, email, password: encryptedPassword, role: 'customer' });
};

module.exports = {
  registerNewUser,
  };
