const { users } = require('../database/models');

const getAll = async () => {
  const user = await users.findAll();
  return user;
};

module.exports = {
  getAll,
};