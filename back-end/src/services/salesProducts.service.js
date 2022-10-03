const { Sale } = require('../database/models');
const { users } = require('../database/models');
const { products } = require('../database/models');
// const { SalesProduct } = require('../database/models');

const getAll = async () => {
  const sales = await Sale.findAll({
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
  
const getSaleById = async (id) => {
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
  const order = await getSaleById(id);
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
  getSaleById,
  patchOrder,
};