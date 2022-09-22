const { products } = require('../database/models');

const getAll = async () => {
  const result = await products.findAll();
  return result;
};

const getById = async (id) => {
  const user = await products.findOne(
    { where: { id },
  },
);
  return user;
};

module.exports = {
  getAll,
  getById,
};