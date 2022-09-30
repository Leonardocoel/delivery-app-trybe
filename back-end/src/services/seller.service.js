const { Sale } = require('../database/models');
const { users } = require('../database/models');
const { products } = require('../database/models');

// const { Op } = require('sequelize');
// const { validateUserCreation } = require('../utils/user.validations');
// const passwordEncryption = require('../utils/cryptography.utilities');

const getAll = async () => {
  const order = await Sale.findAll({    
      attributes: { exclude: ['userId'] },  
  });
  return order;
};

const getOrderById = async (id) => {
  const sales = await Sale.findOne({
    where: { id },
    include: [{
      model: users,
      as: 'seller',
      attributes: { exclude: ['password'] },
    },
    {
      model: products,
      as: 'products',
      attributes: { exclude: ['urlImage'] },
      through: {
        attributes: ['quantity'],
      },
    },
  ],
  });
    return sales;
};

const patchOrder = async (id, data) => {
  console.log(data);
  const order = await getOrderById(id);
  if (!order) {
    const e = new Error('Order does not exist');
    e.name = 'NotFoundError';
    throw e;
  }
  const resultUpdated = order.update({ status: data }, { where: { id } });
  return resultUpdated;
};

module.exports = {
  getAll,
  getOrderById,
  patchOrder,
};