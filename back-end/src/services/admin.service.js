const { users } = require('../database/models');

const getAll = async () => {
  const result = await users.findAll();
  return result;
};

const getUserById = async (id) => {
  const user = await users.findOne(
    { where: { id },
  },
);
  return user;
};

const createUser = async (data) => {
  const newUser = await users.create(data);
  return newUser;
};

const updateUser = async (id, data) => {
  const result = await getUserById(id);
  if (!result) {
    const e = new Error('User does not exist');
    e.name = 'NotFoundError';
    throw e;
  }
  const resultUpdated = result.update({ data });
  return resultUpdated;
};

const deleteUserById = async (id) => {
  const product = await getUserById(id);
  if (!product) {
    const e = new Error('User does not exist');
    e.name = 'NotFoundError';
    throw e;
  }
  return users.destroy({ where: { id: [id] } });  
};

module.exports = {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
};