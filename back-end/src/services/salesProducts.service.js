const { Sale } = require('../database/models');
const { users } = require('../database/models');
const { products } = require('../database/models');

const getAll = async () => {
  const salesAndUser = await Sale.findAll({
    include: [{
      model: users,
      as: 'seller',
      attributes: { exclude: ['password'] }
    },
    {
      model: products,
      as: 'products',
      attributes: { exclude: ['urlImage'] },
      through: {
        attributes: ['quantity']
      }
    }
  ]
  })
    return salesAndUser;
  };
  
const getSaleById = async (id) => {
  const user = await Sale.findOne(
    { where: { id },
  },
);
  return user;
};

const updateSale = async (id, data) => {
  const result = await getSaleById(id);
  if (!result) {
    const e = new Error('Sale does not exist');
    e.name = 'NotFoundError';
    throw e;
  }
  const resultUpdated = result.update({ data });
  return resultUpdated;
};

module.exports = {
  getAll,
  getSaleById,
  updateSale,
};