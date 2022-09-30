const sellerService = require('../services/seller.service');

const getAll = async (req, res, next) => {
     try { 
       const orders = await sellerService.getAll();
       return res.status(200).json(orders);
     } catch (error) {
       next(error);
     }
   };

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const result = await sellerService.getOrderById(id);
    if (!result) {
      const e = new Error('Order does not exist');
      e.name = 'NotFoundError';
      throw e;
    }
  return res.status(200).json(result);
  };

  const patchOrder = async (req, res) => {
    const { id } = req.params;
    const { message } = req.body
    const result = await sellerService.patchOrder(Number(id), message);
    if (!result) {
      const e = new Error('Conflict');
      e.name = 'Conflict';
      throw e;
    }
    return res.status(200).json(result);
  };
   
   module.exports = {
       getAll,
       getOrderById,
       patchOrder,
     };