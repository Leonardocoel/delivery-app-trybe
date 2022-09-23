const adminService = require('../services/admin.service');

const getAll = async (req, res, next) => {
     try { 
       const users = await adminService.getAll();
       return res.status(200).json({ users });
     } catch (error) {
       next(error);
     }
   };

const getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await adminService.getUserById(id);
    if (!result) {
      const e = new Error('User does not exist');
      e.name = 'NotFoundError';
      throw e;
    }
  return res.status(200).json(result);
  };

  const createUser = async (req, res) => {
    const result = await adminService.createUser(req.body);
    return res.status(201).json({ result });
  };

  const updateUser = async (req, res) => {
    const { id } = req.params;
    const result = await adminService.updateUser(Number(id), req.body);
    if (!result) {
      const e = new Error('Conflict');
      e.name = 'Conflict';
      throw e;
    }
    return res.status(200).json(result);
  };

  const deleteUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await adminService.deleteUserById(Number(id));
      if (result) {
        return res.status(204).end();
      }
    } catch (err) {
      next(err);
    }
  };
   
   module.exports = {
       getAll,
       getUserById,
       createUser,
       updateUser,
       deleteUserById,
     };