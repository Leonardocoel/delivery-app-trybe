const { Op } = require('sequelize');
const { users } = require('../database/models');
const { validateUserCreation } = require('../utils/user.validations');
const passwordEncryption = require('../utils/cryptography.utilities');

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
  validateUserCreation(data);
  const { name, email, password } = data;
  const encryptedPassword = passwordEncryption.encryptPassword(password);
  const newUser = await users.findOne({ where: { [Op.or]: [{ name }, { email }] } });
  if (newUser) {
    const e = new Error('Name or email is already in use');
    e.name = 'Conflict';
    throw e;
  }
  const userCreated = await users.create({ 
    name, email, password: encryptedPassword, role: 'customer' });
  return userCreated;
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