const productsService = require('../services/products.service');

const getAll = async (req, res, next) => {
     try { 
       const products = await productsService.getAll();
       return res.status(200).json({ products });
     } catch (error) {
       next(error);
     }
   };
   
   module.exports = {
       getAll, 
     };