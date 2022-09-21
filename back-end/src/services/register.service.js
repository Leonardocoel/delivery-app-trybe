require('dotenv/config');
const { users } = require('../database/models');

const registerNewUser = async (username, email, password, role) => {
  await users.create({ username, email, password, role });

  const newUser = await users.findOne({ where: { email, username } });
  if (!newUser) {
    const e = new Error('Invalid fields');
    e.name = 'ValidationError';
    throw e;
  }
};

module.exports = {
  registerNewUser,
  };
