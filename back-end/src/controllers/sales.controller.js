const jwt = require('jsonwebtoken');
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
  const token = req.headers.authorization;
  const user = jwt.decode(token);
  const result = await salesService.createSale(req.body, user.data.name);
  return res.status(201).json(result);
  };

const deleteSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesService.deleteSaleById(Number(id));
      if (result) {
        return res.status(204).end();
      }
    } catch (err) {
      next(err);
    }
  };

  module.exports = {
    getAll,
    createSale,
    getSaleById,
    deleteSaleById,
  };