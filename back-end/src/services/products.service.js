const { products } = require('../database/models');

const getAll = async () => {
  const result = await products.findAll();
  return result;
};

const getProductById = async (id) => {
  const user = await products.findOne(
    { where: { id },
  },
);
  return user;
};

const createProduct = async (data) => {
  const newProduct = await products.create(data);
  return newProduct;
};

const updateProduct = async (id, data) => {
  const result = await getProductById(id);
  if (!result) {
    const e = new Error('Product does not exist');
    e.name = 'NotFoundError';
    throw e;
  }
  const resultUpdated = result.update({ data });
  return resultUpdated;
};

const deleteProductById = async (id) => {
  const product = await getProductById(id);
  if (!product) {
    const e = new Error('Product does not exist');
    e.name = 'NotFoundError';
    throw e;
  }
  return product.destroy({ where: { id: [id] } });  
};

module.exports = {
  getAll,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
};