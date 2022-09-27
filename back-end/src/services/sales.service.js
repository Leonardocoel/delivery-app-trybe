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
  const { dataValues: { id: userId } } = await users.findOne({ where: { name: saleName } });
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber, productsArray } = data;

  const { dataValues } = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'Pending',
  });

  const result = {
    saleId: dataValues.id,
  };

  productsArray.map(async ({ name, quantity }) => {
    const { id } = await products.findOne({ where: { name } });

    await SalesProduct.create({ saleId: result.saleId, productId: id, quantity });
  });
  return result;
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

const deleteSaleById = async (id) => {
  const sale = await getSaleById(id);
  if (!sale) {
    const e = new Error('Sale does not exist');
    e.name = 'NotFoundError';
    throw e;
  }
  return Sale.destroy({ where: { id: [id] } });  
};

module.exports = {
  getAll,
  getSaleById,
  createSale,
  updateSale,
  deleteSaleById,
};