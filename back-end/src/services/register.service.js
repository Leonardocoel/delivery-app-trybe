require('dotenv/config');
const { users } = require('../database/models');

const registerNewUser = async (username, email, password) => {
  const newUser = await users.findOne({ where: { email, username } });
  if (newUser) {
    const e = new Error('Invalid fields');
    e.name = 'ValidationError';
    throw e;
  }  
  await users.create({ username, email, password, role: 'custumer' });
};

module.exports = {
  registerNewUser,
  };
