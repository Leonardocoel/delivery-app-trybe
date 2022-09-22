const productsService = require('../services/products.service');

const getAll = async (req, res, next) => {
     try { 
       const products = await productsService.getAll();
       return res.status(200).json({ products });
     } catch (error) {
       next(error);
     }
   };

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getById(id);
    if (!result) {
      const e = new Error('Product does not exist');
      e.name = 'NotFoundError';
      throw e;
    }
  return res.status(200).json(result);
  };
   
   module.exports = {
       getAll,
       getById,
     };