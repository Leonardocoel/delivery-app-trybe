const sellerService = require('../services/seller.service');

const getAll = async (req, res, next) => {
     try { 
       const users = await sellerService.getAll();
       return res.status(200).json({ users });
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

//   const createUser = async (req, res, next) => {
//     try {
//       const result = await adminService.createUser(req.body);
//       return res.status(201).json(result);
//     } catch (error) {
//       next(error);
//     }
//   };

  const updateOrder = async (req, res) => {
    const { id } = req.params;
    const result = await sellerService.updateOrder(Number(id), req.body);
    if (!result) {
      const e = new Error('Conflict');
      e.name = 'Conflict';
      throw e;
    }
    return res.status(200).json(result);
  };

  const deleteOrderById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await sellerService.deleteOrderById(Number(id));
      if (result) {
        return res.status(204).end();
      }
    } catch (err) {
      next(err);
    }
  };
   
   module.exports = {
       getAll,
       getOrderById,
      //  createUser,
       updateOrder,
       deleteOrderById,
     };