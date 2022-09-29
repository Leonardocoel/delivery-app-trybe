const salesService = require('../services/sales.service');

const getAll = async (req, res, next) => {
  try { 
    const sales = await salesService.getAll();
    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const getSaleById = async (req, res) => {
const { id } = req.params;
const result = await salesService.getSaleById(id);
 if (!result) {
   const e = new Error('Sale does not exist');
   e.name = 'NotFoundError';
   throw e;
 }
return res.status(200).json(result);
};

const createSale = async (req, res) => {
  const result = await salesService.createSale(req.body);
  return res.status(201).json(result);
  };

  module.exports = {
    getAll,
    createSale,
    getSaleById,
  };