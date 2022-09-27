const { Sale } = require('../database/models');
// const { Op } = require('sequelize');
// const { validateUserCreation } = require('../utils/user.validations');
// const passwordEncryption = require('../utils/cryptography.utilities');

const getAll = async () => {
  const order = await Sale.findAll({
    
      attributes: { exclude: ['userId']}
  
  });
  return order;
};

const getOrderById = async (id) => {
  const order = await Sale.findOne(
    { where: { id },
  },
);
  return order;
};

// const createUser = async (data) => {
//   validateUserCreation(data);
//   const { name, email, password } = data;
//   const encryptedPassword = passwordEncryption.encryptPassword(password);
//   const newUser = await users.findOne({ where: { [Op.or]: [{ name }, { email }] } });
//   if (newUser) {
//     const e = new Error('Name or email is already in use');
//     e.name = 'Conflict';
//     throw e;
//   }
//   const userCreated = await users.create({ 
//     name, email, password: encryptedPassword, role: 'customer' });
//   return userCreated;
// };

const updateOrder = async (id, data) => {
  const order = await getOrderById(id);
  if (!order) {
    const e = new Error('Order does not exist');
    e.name = 'NotFoundError';
    throw e;
  }
  const resultUpdated = result.update({ data });
  return resultUpdated;
};

const deleteOrderById = async (id) => {
  const order = await getUserById(id);
  if (!order) {
    const e = new Error('User does not exist');
    e.name = 'NotFoundError';
    throw e;
  }
  return order.destroy({ where: { id: [id] } });  
};

module.exports = {
  getAll,
  getOrderById,
  // createUser,
  updateOrder,
  deleteOrderById,
};