require('dotenv/config');
const { users } = require('../database/models');

const registerNewUser = async (username, email, password) => {
  const newUser = await users.findOne({ where: { email, username } });
  if (newUser) {
    const e = new Error('User already exists');
    e.name = 'Conflict';
    throw e;
  }
  await users.create({ username, email, password, role: 'customer' });
};

module.exports = {
  registerNewUser,
  };
