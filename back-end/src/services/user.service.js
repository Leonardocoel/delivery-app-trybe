const { users } = require('../database/models');

const getAll = async (role) => {
  if (role === 'admin') return [];
  const user = await users.findAll({
    where: { role },
    attributes: ['name', 'id'],
  });
  return user;
};

module.exports = {
  getAll,
};