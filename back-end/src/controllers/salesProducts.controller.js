const salesProductsService = require('../services/salesProducts.service');

const getAll = async (req, res, next) => {
  try { 
    const sales = await salesProductsService.getAll();
    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const getSaleById = async (req, res) => {
const { id } = req.params;
const result = await salesProductsService.getSaleById(id);
 if (!result) {
   const e = new Error('Sale does not exist');
   e.name = 'NotFoundError';
   throw e;
 }
return res.status(200).json(result);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const result = await salesProductsService.updateSale(Number(id), req.body);
  if (!result) {
    const e = new Error('Conflict');
    e.name = 'Conflict';
    throw e;
  }
  return res.status(200).json(result);
};

    module.exports = {
      getAll,
      getSaleById,
      updateSale,
    };