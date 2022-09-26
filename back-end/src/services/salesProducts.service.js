const { Sale } = require('../database/models');
const { users } = require('../database/models');
const { products } = require('../database/models');
const { SalesProduct } = require('../database/models');

const getAll = async () => {
    const productDetails = await Sale.findAll({
      include: [
        {
          model: users, 
          as: 'sellerFK',
          include: [SalesProduct, products], 
          through: { 
          attributes: [] } },
        
        { model: products, 
          as: 'productFK',
          include: [SalesProduct,users], 
          through: {
          attributes: [] } },      
        { model: SalesProduct, 
          as: 'saleFK',
          include: [products, users ], 
          through: {
          attributes: [] } },
      ],
    });
    return productDetails;
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