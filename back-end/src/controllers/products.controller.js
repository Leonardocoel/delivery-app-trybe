const productsService = require('../services/products.service');

const getAll = async (req, res, next) => {
     try { 
       const products = await productsService.getAll();
       return res.status(200).json(products);
     } catch (error) {
       next(error);
     }
   };

const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getProductById(id);
    if (!result) {
      const e = new Error('Product does not exist');
      e.name = 'NotFoundError';
      throw e;
    }
  return res.status(200).json(result);
  };

  const createProduct = async (req, res) => {
    const result = await productsService.createProduct(req.body);
    return res.status(201).json(result);
  };

  const updateProduct = async (req, res) => {
    const { id } = req.params;
    const result = await productsService.updateProduct(Number(id), req.body);
    if (!result) {
      const e = new Error('Conflict');
      e.name = 'Conflict';
      throw e;
    }
    return res.status(200).json(result);
  };

  const deleteProductById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await productsService.deleteProductById(Number(id));
      if (result) {
        return res.status(204).end();
      }
    } catch (err) {
      next(err);
    }
  };
   
   module.exports = {
       getAll,
       getProductById,
       createProduct,
       updateProduct,
       deleteProductById,
     };