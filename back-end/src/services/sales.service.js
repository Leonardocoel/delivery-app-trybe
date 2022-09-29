const Sequelize = require('sequelize');
const { Sale } = require('../database/models');
const { SalesProduct } = require('../database/models');
const { users } = require('../database/models');
const config = require('../database/config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

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

const createSale = async ({ userName, ...sales }) => {
  const { productsArray } = sales;
  const { id: userId } = await users.findOne({ where: { name: userName }, raw: true });

  try {
    const result = await sequelize.transaction(async (t) => {
      const { dataValues: { id: saleId } } = await Sale
      .create({ userId, ...sales, status: 'Pendente' }, { transaction: t });

      await Promise.all(productsArray.map(async ({ productId, quantity }) => {
        await SalesProduct.create({ saleId, productId, quantity }, { transaction: t });
      }));

      return { saleId };
    });

    return result;
  } catch (e) {
    console.log(e);
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