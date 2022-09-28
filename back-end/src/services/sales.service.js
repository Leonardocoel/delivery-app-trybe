const sequelize = require('sequelize');
const { Sale } = require('../database/models');
const { products } = require('../database/models');
const { SalesProduct } = require('../database/models');
const { users } = require('../database/models');

const getAll = async () => {
  const result = await Sale.findAll();
  return result;
  };

const getSaleById = async (id) => {
  const user = await Sale.findOne(
    { where: { id },
  },
);
  return user;
};

const createSale = async (data, saleName) => {
  const t = await sequelize.Transaction();
  try {
    const { dataValues: { id: userId } } = await users.findOne({ where: { name: saleName } });
    const { productsArray } = data;
    const { dataValues } = await Sale.create({ ...data, userId, status: 'Pending' }); 
    const result = { saleId: dataValues.id };
    productsArray.map(async (product) => {
      const { id } = await products.findOne({ where: { name: product[0] } });
      await SalesProduct
      .create({ saleId: result.saleId, productId: id, quantity: [product[1].quantity] });
    });
    await t.commit();
    return result;
} catch (e) {
  await t.rollback();
  throw e;
}
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
  createSale,
  updateSale,
};